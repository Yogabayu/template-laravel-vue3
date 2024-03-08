<?php

namespace App\Http\Controllers\User;

use App\Helpers\ResponseHelper;
use App\Helpers\UserActivityHelper;
use App\Http\Controllers\Controller;
use App\Models\FileFavorite;
use App\Models\FileToPosition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User Mengakses dashboard');
            $random = FileToPosition::with('file', 'file.author')
                ->where('position_uuid', auth()->user()->position_id)
                ->inRandomOrder()
                ->take(4)
                ->get();

            return ResponseHelper::successRes('Berhasil Mendapatkan Data', $random);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes('Failed');
        }
    }
    public function fileFav()
    {
        try {
            $fileViews = DB::table('fileviews')
                ->select('files.id', 'files.name', 'files.summary', DB::raw('COUNT(fileviews.id) AS views_count'))
                ->join('files', 'fileviews.file_uuid', '=', 'files.id')
                ->join('users', 'fileviews.user_uuid', '=', 'users.uuid')
                ->join('positions', 'users.position_id', '=', 'positions.id')
                ->where('positions.id', auth()->user()->position_id)
                ->groupBy('files.id', 'files.name', 'users.name', 'files.summary')
                ->orderByDesc('views_count')
                ->take(4)
                ->get();

            return ResponseHelper::successRes('Berhasil Mendapatkan Data', $fileViews);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes('Failed');
        }
    }

    public function getNewFile()
    {
        try {
            $newfile = FileToPosition::with('file', 'file.author')
                ->where('position_uuid', auth()->user()->position_id)
                ->orderBy('created_at', 'desc')
                ->first();

            return ResponseHelper::successRes('Berhasil Mendapatkan Data', $newfile);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes('failed get newest file');
        }
    }
}
