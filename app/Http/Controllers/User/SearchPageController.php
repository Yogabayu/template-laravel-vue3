<?php

namespace App\Http\Controllers\User;

use App\Helpers\ResponseHelper;
use App\Helpers\UserActivityHelper;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\File;
use App\Models\FileToCategory;
use App\Models\FileToPosition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchPageController extends Controller
{
    public function index(Request $request)
    {
        try {
            // $query = FileToPosition::with(['file', 'file.author', 'file.categories', 'file.favorite'])
            //     ->where('position_uuid', auth()->user()->position_id);

            // if ($request->has('name')) {
            //     $query->whereHas('file', function ($query) use ($request) {
            //         $query->where('name', 'like', '%' . $request->name . '%');
            //     });
            // }

            // if ($request->has('category')) {
            //     $query->whereHas('file.categories', function ($query) use ($request) {
            //         $query->where('categories.id', $request->category);
            //     });
            // }

            // $files = $query->get();
            $files =  DB::table('filetocategories')
                ->join('files', 'filetocategories.file_uuid', '=', 'files.id')
                ->join('users', 'files.author_uuid', '=', 'users.uuid')
                ->join('categories', 'filetocategories.category_uuid', '=', 'categories.id')
                ->join('filetopositions', 'filetopositions.file_uuid', '=', 'files.id')
                ->leftJoin('filefavorites', function ($join) {
                    $join->on('filefavorites.file_uuid', '=', 'files.id')
                        ->where('filefavorites.user_uuid', '=', auth()->user()->uuid);
                })
                ->select('files.*', 'users.name as username', DB::raw('IF(filefavorites.file_uuid IS NOT NULL, 1, 0) as favorite'))
                ->where('categories.id', $request->category)
                ->where('files.name', 'like', '%' . $request->name . '%')
                ->where('filetopositions.position_uuid', auth()->user()->position_id)
                ->groupBy('files.id', 'files.author_uuid', 'files.name', 'files.path', 'files.summary', 'files.created_at', 'files.updated_at', 'users.name')
                ->get();

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User mencari file berdasarkan parameter');

            return ResponseHelper::successRes('berhasil mendapatkan data', $files);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function category()
    {
        try {
            // $categories = DB::table('filetocategories')
            //     ->join('files', 'filetocategories.file_uuid', '=', 'files.id')
            //     ->join('categories', 'filetocategories.category_uuid', '=', 'categories.id')
            //     ->join('users', 'files.author_uuid', '=', 'users.uuid')
            //     ->join('positions', 'users.position_id', '=', 'positions.id')
            //     ->where('positions.id', auth()->user()->position_id)
            //     ->select('categories.*', DB::raw('COUNT(files.id) as file_count'))
            //     ->groupBy('categories.id')
            //     ->get();

            $categories = Category::all();

            return ResponseHelper::successRes('berhasil mendapatkan data', $categories);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes('Failed to retrieve categories. ' . $e->getMessage());
        }
    }

    public function fileToCategory($uuid)
    {
        try {
            $files = DB::table('filetocategories')
                ->join('files', 'filetocategories.file_uuid', '=', 'files.id')
                ->join('users', 'files.author_uuid', '=', 'users.uuid')
                ->join('categories', 'filetocategories.category_uuid', '=', 'categories.id')
                ->join('filetopositions', 'filetopositions.file_uuid', '=', 'files.id')
                ->leftJoin('filefavorites', function ($join) {
                    $join->on('filefavorites.file_uuid', '=', 'files.id')
                        ->where('filefavorites.user_uuid', '=', auth()->user()->uuid);
                })
                ->select('files.*', 'users.name as username', DB::raw('IF(filefavorites.file_uuid IS NOT NULL, 1, 0) as favorite'))
                ->where('categories.id', $uuid)
                ->where('filetopositions.position_uuid', auth()->user()->position_id)
                ->groupBy('files.id', 'files.author_uuid', 'files.name', 'files.path', 'files.summary', 'files.created_at', 'files.updated_at', 'users.name')
                ->get();
            $category = Category::where('id', $uuid)->first();

            return response()->json([
                'success' => true,
                'message' => 'berhasil mendapatkan data',
                'data' => [
                    'files' => $files,
                    'category' => $category
                ]
            ]);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
