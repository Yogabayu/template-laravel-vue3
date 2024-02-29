<?php

namespace App\Http\Controllers\Auth;

use App\Helpers\UserActivityHelper;
use App\Http\Controllers\Controller;
use App\Models\DeviceVerification;
use App\Models\User;
use App\Models\UserActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $data = $request->validate([
                'name' => 'required|max:255',
                'email' => 'required|email|unique:users',
                'password' => 'required'
            ]);

            $data['password'] = Hash::make($request->password);

            $user = User::create($data);

            $token = $user->createToken('appToken')->accessToken;

            // return response(['user' => $user, 'token' => $token]);

            return response()->json([
                'user' => $user,
                'token' => $token,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to authenticate. | ' . $e->getMessage(),
            ], 401);
        }
    }

    public function login(Request $request)
    {
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {

            $user = User::find(Auth::user()->id);
            $user_token['token'] = $user->createToken('appToken')->accessToken;
            if (!$user->isActive) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed | Akun tidak aktif, silahkan hubungi administrator',
                ], 401);
            }

            $deviceUser = DB::table('deviceverifications')->where('user_uuid', auth()->user()->uuid)->get();

            if (!$deviceUser->isEmpty()) {
                $deviceMatched = false;

                foreach ($deviceUser as $dv) {
                    if ($dv->deviceName == request('device') && $dv->ip == $request->ip()) {
                        if ($dv->isVerified == 1) {
                            $deviceMatched = true;
                            break;
                        }
                    }
                }

                if (!$deviceMatched) {
                    $deviceDifferent = false;

                    foreach ($deviceUser as $dv) {
                        if ($dv->isVerified != 0 && ($dv->ip != $request->ip() && $dv->deviceName != request('device'))) {
                            $deviceDifferent = true;
                            break;
                        }
                    }

                    if ($deviceDifferent) {
                        DeviceVerification::create([
                            'user_uuid' => auth()->user()->uuid,
                            'deviceName' => request('device'),
                            'ip' => $request->ip(),
                            'isVerified' => 0,
                        ]);
                    }

                    UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User gagal login karena device / ip terdeteksi berbeda dari yang didaftarkan');

                    return response()->json([
                        'success' => false,
                        'message' => 'Failed | Device tidak memiliki akses',
                    ], 401);
                }
            } else {
                DeviceVerification::create([
                    'user_uuid' => auth()->user()->uuid,
                    'deviceName' => request('device'),
                    'ip' => $request->ip(),
                    'isVerified' => 1,
                ]);
            }

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User Login');

            return response()->json([
                'success' => true,
                'token' => $user_token,
                'user' => $user,
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Failed | Email atau Password salah.',
            ], 401);
        }
    }

    public function destroy(Request $request)
    {
        if (Auth::user()) {
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User Logout');
            $request->user()->token()->revoke();

            return response()->json([
                'success' => true,
                'message' => 'Logged out successfully',
            ], 200);
        }
    }
}
