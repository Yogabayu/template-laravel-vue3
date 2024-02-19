<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\UserActivityHelper;
use App\Http\Controllers\Controller;
use App\Models\Division;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class DivisionController extends Controller
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
            $divisions = Division::all();
            return $this->successRes('Successfully retrieved divisions.', $divisions);
        } catch (\Exception $e) {
            return $this->errorRes('Failed to retrieve divisions. ' . $e->getMessage());
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

            $divisions = [];

            if (is_array($request->name)) {
                // Jika 'name' adalah array
                foreach ($request->name as $name) {
                    $this->validateDivisionName($name);
                    $division = $this->createDivision($name);
                    $divisions[] = $division;
                }
            } else {
                // Jika 'name' adalah string tunggal
                $this->validateDivisionName($request->name);
                $division = $this->createDivision($request->name);
                $divisions[] = $division;
            }

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User Add new divisions(s)');

            return $this->successRes('Successfully created division(s).', $divisions);
        } catch (\Exception $e) {
            return $this->errorRes('Failed to create division(s). ' . $e->getMessage());
        }
    }

    private function validateDivisionName($name)
    {
        Validator::make(['name' => $name], [
            'name' => 'required|string|unique:divisions,name',
        ], [
            'name.required' => 'Division name is required.',
            'name.unique' => 'The Division name :input has already been taken.',
        ])->validate();
    }

    private function createDivision($name)
    {
        return Division::create([
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
            $division = Division::findOrFail($id);

            return $this->successRes('Successfully get division.', $division);
        } catch (\Exception $e) {
            return $this->errorRes('Failed to create divisions. ' . $e->getMessage());
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
                'name' => 'required|unique:divisions,name,' . $id,
            ], [
                'name.unique' => 'The division name has already been taken.',
            ]);

            $division = Division::where('id', $id)->first();
            $division->name = $request->name;
            $division->save();

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User update division | ' . $division->id);
            return $this->successRes('Successfully updated division.', $division);
        } catch (\Exception $e) {
            return $this->errorRes('Failed to update division. ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $division = Division::findOrFail($id);

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User delete division | ' . $division->name);
            // Periksa apakah ada pengguna yang terkait dengan posisi
            if ($division->users()->exists()) {
                return $this->errorRes('Failed to delete division. There are users associated with this division.');
            }

            // Jika tidak ada pengguna yang terkait, lanjutkan dengan penghapusan posisi
            $division->delete();

            return $this->successRes('Successfully delete division.', $division);
        } catch (\Exception $e) {
            return $this->errorRes('Failed to update division. ' . $e->getMessage());
        }
    }
}
