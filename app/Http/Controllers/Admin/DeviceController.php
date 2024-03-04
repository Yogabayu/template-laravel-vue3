<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ResponseHelper;
use App\Helpers\UserActivityHelper;
use App\Http\Controllers\Controller;
use App\Models\DeviceVerification;
use App\Models\User;
use Illuminate\Http\Request;

class DeviceController extends Controller
{
    public function index()
    {
        try {
            $devices = User::with('position')->withCount('devices')->get();
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'Melihat data device');

            return ResponseHelper::successRes('Berhasil mendapatkan data', $devices);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function deviceUser($id)
    {
        try {
            $user = User::where('uuid', $id)->first();
            $listDevices = DeviceVerification::where('user_uuid', $id)->get();

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'Melihat data device : ' . $user->name);

            return response()->json([
                'success' => true,
                'message' => 'Berhasil mendapatkan data',
                'user' => $user,
                'devices' => $listDevices
            ]);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function updateDevice(Request $request, $id)
    {
        try {
            $device = DeviceVerification::findOrFail($id);
            if ($request->has('nameDev')) {
                $device->nameDev = $request->nameDev;
            }
            if ($request->has('isVerified')) {
                $device->isVerified = $request->isVerified;
            }
            $device->save();

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'Update data device : ' . $device->nameDev);

            return ResponseHelper::successRes('Berhasil update data', $device);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function deleteDevice($id)
    {
        try {
            $deleted = DeviceVerification::where('id', $id)->delete();
            if ($deleted) {
                UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'menghapus data device : ' . $id);
                return ResponseHelper::successRes('Berhasil menghapus data', ['id' => $id]);
            } else {
                return ResponseHelper::errorRes('Data tidak ditemukan atau gagal menghapus');
            }
        } catch (\Exception $e) {
            return ResponseHelper::errorRes('Terjadi kesalahan saat menghapus data: ' . $e->getMessage());
        }
    }
}
