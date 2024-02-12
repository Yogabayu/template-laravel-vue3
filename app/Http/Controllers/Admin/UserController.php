<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function userProfile()
    {
        try {
            $userData = User::where('id', auth()->user()->id)->first();

            return response()->json([
                'success' => true,
                'message' => 'Berhasil mendapatkan data',
                'data' => $userData,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to authenticate. | ' . $e->getMessage(),
                'data' => null,
            ], 401);
        }
    }

    public function updateUserProfile(Request $request)
    {
        try {
            $message = '';
            $userData = User::where('id', auth()->user()->id)->first();
            $userData->name = $request->name;
            $userData->email = $request->email;

            if ($request->password) {
                $userData->password = Hash::make($request->password);
                $message = 'silahkan login ulang';
            }

            $userData->save();

            return response()->json([
                'success' => true,
                'message' => 'Berhasil update data, ' . $message,
                'data' => $userData,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
                'data' => null,
            ], 401);
        }
    }
}
