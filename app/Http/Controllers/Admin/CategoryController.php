<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\UserActivityHelper;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CategoryController extends Controller
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
            $categories = Category::all();
            return $this->successRes('Successfully retrieved categories.', $categories);
        } catch (\Exception $e) {
            return $this->errorRes('Failed to retrieve categories. ' . $e->getMessage());
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

            $categories = [];

            if (is_array($request->name)) {
                // Jika 'name' adalah array
                foreach ($request->name as $name) {
                    $this->validateCategoryName($name);
                    $category = $this->createCategory($name);
                    $categories[] = $category;
                }
            } else {
                // Jika 'name' adalah string tunggal
                $this->validateCategoryName($request->name);
                $category = $this->createCategory($request->name);
                $categories[] = $category;
            }

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User Add new category(s)');
            return $this->successRes('Successfully created category(s).', $categories);
        } catch (\Exception $e) {
            return $this->errorRes('Failed to create category(s). ' . $e->getMessage());
        }
    }

    private function validateCategoryName($name)
    {
        Validator::make(['name' => $name], [
            'name' => 'required|string|unique:categories,name',
        ], [
            'name.required' => 'Category name is required.',
            'name.unique' => 'The Category name :input has already been taken.',
        ])->validate();
    }

    private function createCategory($name)
    {
        return Category::create([
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
            $category = Category::findOrFail($id);

            return $this->successRes('Successfully get category.', $category);
        } catch (\Exception $e) {
            return $this->errorRes('Failed to create category. ' . $e->getMessage());
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
                'name' => 'required|unique:categories,name,' . $id,
            ], [
                'name.unique' => 'The category name has already been taken.',
            ]);

            $category = Category::where('id', $id)->first();
            $category->name = $request->name;
            $category->save();

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User updated category | ' . $category->id);
            return $this->successRes('Successfully updated category.', $category);
        } catch (\Exception $e) {
            return $this->errorRes('Failed to update category. ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $category = Category::findOrFail($id);

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User delete category | ' . $category->name);
            // Periksa apakah ada pengguna yang terkait dengan posisi
            // if ($category->users()->exists()) {
            //     return $this->errorRes('Failed to delete category. There are users associated with this category.');
            // }

            // Jika tidak ada pengguna yang terkait, lanjutkan dengan penghapusan posisi
            $category->delete();

            return $this->successRes('Successfully delete category.', $category);
        } catch (\Exception $e) {
            return $this->errorRes('Failed to update category. ' . $e->getMessage());
        }
    }
}
