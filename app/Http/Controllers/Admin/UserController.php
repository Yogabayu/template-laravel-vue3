<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ResponseHelper;
use App\Helpers\UserActivityHelper;
use App\Http\Controllers\Controller;
use App\Models\DeviceVerification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function resetPassword($id)
    {
        try {
            $user = User::where('uuid', $id)->firstOrFail();
            $user->password = Hash::make('12345678');
            $user->save();

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'Mereset password user: ' . $user->name);

            return ResponseHelper::successRes('Berhasil reset password, password user sekarang: 12345678', $user);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
    public function deleteDevice($id)
    {
        try {
            DB::beginTransaction();
            $device = DeviceVerification::findOrFail($id);
            $device->delete();
            DB::commit();

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'Menghapus data perangkat: ' . $device->nameDev);

            return response()->json([
                'success' => true,
                'message' => 'Berhasil hapus data',
                'data' => $device
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed Delete | Data not found'
            ], 404);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed Delete | ' . $e->getMessage()
            ], 500);
        }
    }

    public function changeDevice(Request $request)
    {
        try {
            DB::beginTransaction();
            $device = DeviceVerification::findOrFail($request->id);

            if ($request->has('nameDev')) {
                $device->nameDev = $request->nameDev;
            }
            if ($request->has('isVerified')) {
                $device->isVerified = $request->isVerified;
            }
            $device->save();
            DB::commit();

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'Mengubah data perangkat: ' . $device->nameDev);

            return response()->json([
                'success' => true,
                'message' => 'Berhasil update data',
                'data' => $device
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed Update | ' . $e->getMessage()
            ], 500);
        }
    }

    public function userDevices($uuid)
    {
        try {
            $userData = User::with('devices')->where('uuid', $uuid)->first();

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'Mengakses data perangkat user: ' . $userData->name);

            return ResponseHelper::successRes('Berhasil mendapatkan data', $userData);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes('Failed to authenticate. | ' . $e->getMessage());
        }
    }
    public function userProfile()
    {
        try {
            $userData = User::where('id', auth()->user()->id)->first();

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'Mengakses data user : ' . $userData->name);
            return ResponseHelper::successRes('Berhasil mendapatkan data', $userData);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes('Failed to authenticate. | ' . $e->getMessage());
        }
    }

    public function changeAdmin($uuid)
    {
        try {
            $user = User::where('uuid', $uuid)->first();

            if ($user) {
                $user->isAdmin = !$user->isAdmin;
                $user->save();

                UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'Change admin status | ' . $user->name);
                return ResponseHelper::successRes('User admin status changed successfully.', $user);
            } else {
                return ResponseHelper::errorRes('User not found.');
            }
        } catch (\Exception $e) {
            return ResponseHelper::errorRes('Failed to change admin status. | ' . $e->getMessage());
        }
    }

    public function changePermision(Request $request, $uuid)
    {
        try {
            $user = User::where('uuid', $uuid)->first();

            $user->isActive = $request->has('isActive') ? $request->isActive : $user->isActive;
            $user->isAdmin = $request->has('isAdmin') ? $request->isAdmin : $user->isAdmin;
            $user->canDownload = $request->has('canDownload') ? $request->canDownload : $user->canDownload;
            $user->canPrint = $request->has('canPrint') ? $request->canPrint : $user->canPrint;
            $user->canComment = $request->has('canComment') ? $request->canComment : $user->canComment;

            $user->save();

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'Change permission | ' . $user->name);
            return ResponseHelper::successRes('User permission changed successfully.', $user);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes('Failed to change permission status. | ' . $e->getMessage());
        }
    }

    public function addUser(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|unique:users,name,',
                'email' => 'required|email|unique:users,email,',
                'nik' => 'required|unique:users,nik,',
                'photo' => 'required|mimes:jpg,png|max:2048',
                'password' => 'required',
                'position_id' => 'required',
            ], [
                'uuid.required' => 'UUID is required.',
                'name.required' => 'User name is required.',
                'name.unique' => 'The user name has already been taken.',
                'email.required' => 'Email is required.',
                'email.unique' => 'The email has already been taken.',
                'email.email' => 'The email must have @.',
                'nik.required' => 'NIK is required.',
                'nik.unique' => 'The NIK has already been taken.',
                'photo.required' => 'Photo is required.',
                'photo.mimes' => 'The photo must be a JPG or PNG image.',
                'photo.max' => 'The photo may not be greater than 2048 kilobytes.',
                'password.required' => 'Password is required.',
                'position_id.required' => 'Jabatan Wajib Di isi',
            ]);

            $imageEXT = $request->file('photo')->getClientOriginalName();
            $thumbnailname = pathinfo($imageEXT, PATHINFO_FILENAME);
            $EXT = $request->file('photo')->getClientOriginalExtension();
            $thumbnailimage = $thumbnailname . '_' . time() . '.' . $EXT;
            $paththumbnail = $request->file('photo')->move(public_path('user/photo'), $thumbnailimage);

            $user = User::create([
                'uuid'          => Str::uuid(),
                // 'division_id'   => $request->division_id,
                'position_id'   => $request->position_id,
                'nik'           => $request->nik,
                'name'          => $request->name,
                'email'         => $request->email,
                'password'      => Hash::make($request->password),
                'photo'         => $thumbnailimage,
                'isActive'      => $request->isActive ?? 1,
                'isAdmin'       => $request->isAdmin ?? 0,
                'canDownload'   => $request->canDownload ?? 1,
                'canPrint'      => $request->canPrint ?? 1,
                'canComment'    => $request->canComment ?? 1,
            ]);

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'Add new user | ' . $user->name);
            return ResponseHelper::successRes('Berhasil menambahkan user baru', $user);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes('Failed to authenticate. | ' . $e->getMessage());
        }
    }

    public function updateUserProfile(Request $request)
    {
        try {
            $request->validate([
                'uuid' => 'required',
                'name' => 'required|unique:users,name,' . $request->uuid . ',uuid',
                'email' => 'required|email|unique:users,email,' . $request->uuid . ',uuid',
                'nik' => 'required|unique:users,nik,' . $request->uuid . ',uuid',
                'photo' => 'mimes:jpg,png|max:2048',
            ], [
                'uuid.required' => 'UUID is required.',
                'name.required' => 'User name is required.',
                'name.unique' => 'The user name has already been taken.',
                'email.required' => 'Email is required.',
                'email.unique' => 'The email has already been taken.',
                'nik.required' => 'NIK is required.',
                'nik.unique' => 'The NIK has already been taken.',
                'photo.mimes' => 'The photo must be a JPG or PNG image.',
                'photo.max' => 'The photo may not be greater than 2048 kilobytes.',
            ]);

            $user = User::where('uuid', $request->uuid)->first();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->nik = $request->nik;

            if ($request->has('password')) {
                $user->password = Hash::make($request->password);
            }

            if ($request->hasFile('photo')) {
                $oldImage = $user->photo;
                if ($oldImage && File::exists(public_path('user/photo/' . $oldImage))) {
                    File::delete(public_path('user/photo/' . $oldImage));
                }

                $imageEXT = $request->file('photo')->getClientOriginalName();
                $thumbnailname = pathinfo($imageEXT, PATHINFO_FILENAME);
                $EXT = $request->file('photo')->getClientOriginalExtension();
                $thumbnailimage = $thumbnailname . '_' . time() . '.' . $EXT;
                $paththumbnail = $request->file('photo')->move(public_path('user/photo'), $thumbnailimage);

                $user->photo = $thumbnailimage;
            }
            if ($request->has('isActive')) {
                $user->isActive = $request->isActive;
            }
            if ($request->has('isAdmin')) {
                $user->isAdmin = $request->isAdmin;
            }
            if ($request->has('canDownload')) {
                $user->canDownload = $request->canDownload;
            }
            if ($request->has('canPrint')) {
                $user->canPrint = $request->canPrint;
            }
            if ($request->has('canComment')) {
                $user->canComment = $request->canComment;
            }
            if ($request->has('position_id') && $user->position_id != $request->position_id) {
                $user->position_id = $request->position_id;

                // Delete related activities when position is updated
                $user->activity()->delete();
                $user->fileviews()->delete();
            }

            $user->save();

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'Update Profile | ' . $user->name);
            return ResponseHelper::successRes('berhasil update data user', $user);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes('Failed. | ' . $e->getMessage());
        }
    }

    public function deleteUser($uuid)
    {
        try {
            $user = User::where('uuid', $uuid)->first();

            if (!$user) {
                return ResponseHelper::errorRes('User not found.');
            }

            // Hapus kaitan dengan tabel terkait
            // Misalnya, jika ada relasi dengan tabel "posts"
            $user->file()->delete();
            $user->activity()->delete();

            // Lanjutkan untuk menghapus pengguna itu sendiri
            $user->delete();

            return ResponseHelper::successRes('User and related data deleted successfully.', $user);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes('Failed to delete user. | ' . $e->getMessage());
        }
    }

    public function getAllUser()
    {
        try {
            $users = User::with('position')->get();

            return ResponseHelper::successRes('Berhasil mendapatkan data', $users);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function getMostUserview()
    {
        try {
            $most = DB::table('fileviews')
                ->select('users.uuid', 'users.name', 'positions.name as position', DB::raw('COUNT(fileviews.id) AS views_count'))
                ->join('users', 'fileviews.user_uuid', '=', 'users.uuid')
                ->join('positions', 'users.position_id', '=', 'positions.id')
                ->groupBy('users.uuid', 'users.name', 'positions.name')
                ->orderByDesc('views_count')
                ->take(6)
                ->get();

            return ResponseHelper::successRes('Berhasil mendapatkan data', $most);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
