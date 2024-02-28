<?php

namespace App\Http\Controllers\User;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\FileToPosition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchPageController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = FileToPosition::with(['file', 'file.author', 'file.categories', 'file.favorite'])
                ->where('position_uuid', auth()->user()->position_id);

            if ($request->has('name')) {
                $query->whereHas('file', function ($query) use ($request) {
                    $query->where('name', 'like', '%' . $request->name . '%');
                });
            }

            if ($request->has('category')) {
                $query->whereHas('file.categories', function ($query) use ($request) {
                    $query->where('categories.id', $request->category);
                });
            }

            $files = $query->get();

            return ResponseHelper::successRes('berhasil mendapatkan data', $files);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function category()
    {
        try {
            $categories = DB::table('filetocategories')
                ->join('files', 'filetocategories.file_uuid', '=', 'files.id')
                ->join('categories', 'filetocategories.category_uuid', '=', 'categories.id')
                ->join('users', 'files.author_uuid', '=', 'users.uuid')
                ->join('positions', 'users.position_id', '=', 'positions.id')
                ->select('categories.*')
                ->distinct()
                ->get();

            return ResponseHelper::successRes('berhasil mendapatkan data', $categories);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes('Failed to retrieve categories. ' . $e->getMessage());
        }
    }
}
