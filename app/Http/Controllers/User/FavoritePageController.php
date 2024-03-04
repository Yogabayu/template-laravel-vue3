<?php

namespace App\Http\Controllers\User;

use App\Helpers\ResponseHelper;
use App\Helpers\UserActivityHelper;
use App\Http\Controllers\Controller;
use App\Models\FileFav;
use Illuminate\Http\Request;

class FavoritePageController extends Controller
{
    public function favFiles()
    {
        try {
            $favFiles = FileFav::with('file', 'file.author')->where('user_uuid', auth()->user()->uuid)->get();
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User melihat file favorit');

            return ResponseHelper::successRes('berhasil mendapatkan data', $favFiles);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
