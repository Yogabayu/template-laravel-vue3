<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\UserActivityHelper;
use App\Http\Controllers\Controller;
use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PositionController extends Controller
{
    private function successRes($message, $data)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ]);
    }

    private function errorRes($message, $statusCode = 401)
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'data' => null
        ], $statusCode);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $positions = Position::withCount('users')->get();

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'Mengakses semua data jabatan');

            return $this->successRes('Successfully retrieved positions.', $positions);
        } catch (\Exception $e) {
            return $this->errorRes('Failed to retrieve positions. ' . $e->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required',
            ]);

            $positions = [];

            if (is_array($request->name)) {
                // Jika 'name' adalah array
                foreach ($request->name as $name) {
                    $this->validatePositionName($name);
                    $position = $this->createPosition($name);
                    $positions[] = $position;
                }
            } else {
                // Jika 'name' adalah string tunggal
                $this->validatePositionName($request->name);
                $position = $this->createPosition($request->name);
                $positions[] = $position;
            }

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User menambahkan jabatan baru');

            return $this->successRes('Successfully created position(s).', $positions);
        } catch (\Exception $e) {
            return $this->errorRes('Failed to create position(s). ' . $e->getMessage());
        }
    }

    private function validatePositionName($name)
    {
        Validator::make(['name' => $name], [
            'name' => 'required|string|unique:positions,name',
        ], [
            'name.required' => 'Position name is required.',
            'name.unique' => 'The position name :input has already been taken.',
        ])->validate();
    }

    private function createPosition($name)
    {
        return Position::create([
            'id' => Str::uuid(),
            'name' => $name,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $position = Position::findOrFail($id);

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'Mengakses data jabatan : ' . $position->name);

            return $this->successRes('Successfully get position.', $position);
        } catch (\Exception $e) {
            return $this->errorRes('Failed to create position. ' . $e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'name' => 'required|unique:positions,name,' . $id,
            ], [
                'name.unique' => 'The position name has already been taken.',
            ]);

            $position = Position::where('id', $id)->first();
            $position->name = $request->name;
            $position->save();

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User update data jabatan | ' . $position->name);
            return $this->successRes('Successfully updated position.', $position);
        } catch (\Exception $e) {
            return $this->errorRes('Failed to update position. ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $position = Position::findOrFail($id);

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User menghapus jabatan | ' . $position->name);
            // Periksa apakah ada pengguna yang terkait dengan posisi
            if ($position->users()->exists()) {
                return $this->errorRes('Failed to delete position. There are users associated with this position.');
            }

            // Jika tidak ada pengguna yang terkait, lanjutkan dengan penghapusan posisi
            $position->delete();

            return $this->successRes('Successfully delete position.', $position);
        } catch (\Exception $e) {
            return $this->errorRes('Failed to delete position. ' . $e->getMessage(), 402);
        }
    }
}
