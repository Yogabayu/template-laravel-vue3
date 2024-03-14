<?php

namespace App\Http\Controllers\User;

use App\Helpers\ResponseHelper;
use App\Helpers\UserActivityHelper;
use App\Http\Controllers\Controller;
use App\Models\FileView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReadPageController extends Controller
{
    public function getFileView()
    {
        try {
            $files = DB::table('files')
                ->select('files.id', 'files.name', 'files.summary', 'positions.name as posname', 'fileviews.created_at', 'files.keywords')
                ->join('fileviews', function ($join) {
                    $join->on('files.id', '=', 'fileviews.file_uuid')
                        ->whereRaw('fileviews.id IN (
                        SELECT MAX(id) 
                        FROM fileviews 
                        GROUP BY file_uuid
                     )');
                })
                ->join('users', 'fileviews.user_uuid', '=', 'users.uuid')
                ->join('positions', 'users.position_id', '=', 'positions.id')
                ->where('users.uuid', auth()->user()->uuid)
                ->orderByDesc('fileviews.created_at')
                ->get();

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User melihat file terbaca');

            return ResponseHelper::successRes('berhasil mendapatkan data', $files);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
