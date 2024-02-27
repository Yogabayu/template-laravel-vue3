<?php

namespace App\Http\Controllers\User;

use App\Helpers\ResponseHelper;
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
                ->select('files.id', 'files.name', 'files.summary', 'positions.name as posname', 'fileViews.created_at')
                ->join('fileViews', function ($join) {
                    $join->on('files.id', '=', 'fileViews.file_uuid')
                        ->whereRaw('fileViews.id IN (
                        SELECT MAX(id) 
                        FROM fileViews 
                        GROUP BY file_uuid
                     )');
                })
                ->join('users', 'fileViews.user_uuid', '=', 'users.uuid')
                ->join('positions', 'users.position_id', '=', 'positions.id')
                ->where('users.uuid', auth()->user()->uuid)
                ->orderByDesc('fileViews.created_at')
                ->get();

            return ResponseHelper::successRes('berhasil mendapatkan data', $files);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
