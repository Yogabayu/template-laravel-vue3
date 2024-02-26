<?php

namespace App\Http\Controllers\User;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\File;
use App\Models\FileFavorite;
use App\Models\FileToCategory;
use App\Models\FileToPosition;
use App\Models\FileView;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HelperController extends Controller
{
    public function totalFile()
    {
        try {
            $total = FileToPosition::with('file')->where('position_uuid', auth()->user()->position_id)->count();

            return ResponseHelper::successRes('Berhasil Mendapatkan data', $total);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
    public function totalRead()
    {
        try {
            $total = FileView::where('user_uuid', auth()->user()->uuid)->count();

            return ResponseHelper::successRes('Berhasil Mendapatkan data', $total);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
    public function totalFavorite()
    {
        try {
            $total = FileFavorite::where('user_uuid', auth()->user()->uuid)->count();

            return ResponseHelper::successRes('Berhasil Mendapatkan data', $total);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
