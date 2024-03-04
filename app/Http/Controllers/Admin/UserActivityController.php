<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserActivity;
use Illuminate\Http\Request;

class UserActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $datas = UserActivity::with('user')->orderBy('created_at', 'desc')->get();

            return ResponseHelper::successRes('Berhasil mendapatkan data', $datas);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function getUserActivity($id)
    {
        try {
            $datas = UserActivity::with('user')
                ->orderBy('created_at', 'desc')
                ->where('user_uuid', $id)
                ->get();
            $user = User::where('uuid', $id)->first();

            return response()->json([
                'success' => true,
                'message' => 'Berhasil mendapatkan data',
                'user'    => $user,
                'data'    => $datas
            ]);
            return ResponseHelper::successRes('Berhasil mendapatkan data', $datas);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
