<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ResponseHelper;
use App\Helpers\UserActivityHelper;
use App\Http\Controllers\Controller;
use App\Models\Division;
use App\Models\File;
use App\Models\FileToCategory;
use App\Models\FileToDivision;
use App\Models\FileToPosition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File as FacadesFile;
use Illuminate\Support\Str;

class FileController extends Controller
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

    public function filePerDivision()
    {
        try {
            $datas = Division::withCount('files')->with('files')->get();

            return ResponseHelper::successRes('Berhasil mendapatkan data', $datas);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function filePerDivisionId($id)
    {
        try {
            $files = Division::with('files', 'files.positions', 'files.categories', 'files.author')
                ->where('id', $id)
                ->first();

            return ResponseHelper::successRes('berhasil mendapatkan data', $files);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $files = File::with('author', 'divisions', 'positions', 'categories')->get();
            return $this->successRes('Successfully retrieved files.', $files);
        } catch (\Exception $e) {
            return $this->errorRes('Failed to retrieve files. ' . $e->getMessage());
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
                'name'          => 'required',
                'thumbnail'     => 'required|max:2048|mimes:jpg,png',
                'path'          => 'required|max:20480|mimes:pdf',
                'divisions'     => 'required|array',
                'categories'    => 'required|array',
                'positions'     => 'required|array',
                'summary'       => 'required'
            ], [
                'name.required'      => 'Name is required.',
                'thumbnail.required' => 'Thumbnail is required.',
                'thumbnail.mimes'    => 'Thumbnail must be a JPG or PNG image.',
                'path.required'      => 'File is required.',
                'path.mimes'         => 'File must be a PDF.',
                'summary.required'   => 'Summary is required.',
            ]);

            $file = new File();
            $file->id = Str::uuid();
            $file->author_uuid = auth()->user()->uuid;
            $file->name = $request->name;
            $file->summary = $request->summary;

            //upload file
            $imageEXT = $request->file('path')->getClientOriginalName();
            $filename = pathinfo($imageEXT, PATHINFO_FILENAME);
            $EXT = $request->file('path')->getClientOriginalExtension();
            $fileimage = $filename . '_' . time() . '.' . $EXT;
            $path = $request->file('path')->move(public_path('file/file'), $fileimage);
            $file->path = $fileimage;

            //upload thumbnail
            $imageEXT = $request->file('thumbnail')->getClientOriginalName();
            $thumbnailname = pathinfo($imageEXT, PATHINFO_FILENAME);
            $EXT = $request->file('thumbnail')->getClientOriginalExtension();
            $thumbnailimage = $thumbnailname . '_' . time() . '.' . $EXT;
            $paththumbnail = $request->file('thumbnail')->move(public_path('file/thumbnail'), $thumbnailimage);
            $file->thumbnail = $thumbnailimage;

            $file->save();

            $divisions = $request->divisions;
            foreach ($divisions as $div) {
                $divisionMapping = new FileToDivision();
                $divisionMapping->file_uuid = $file->id;
                $divisionMapping->division_uuid = $div;
                $divisionMapping->save();
            }

            $positions = $request->positions;
            foreach ($positions as $pos) {
                $posisionMapping = new FileToPosition();
                $posisionMapping->file_uuid = $file->id;
                $posisionMapping->position_uuid = $pos;
                $posisionMapping->save();
            }

            $categories = $request->categories;
            foreach ($categories as $cat) {
                $categoryMapping = new FileToCategory();
                $categoryMapping->file_uuid = $file->id;
                $categoryMapping->category_uuid = $cat;
                $categoryMapping->save();
            }
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User Add new file | ' . $file->id);

            return $this->successRes('Successfully added new files.', $file);
        } catch (\Exception $e) {
            return $this->errorRes('Failed to retrieve files. ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $file = File::with('author', 'divisions', 'positions', 'categories')->where('id', $id)->first();
            return $this->successRes('File retrieved successfully.', $file);
        } catch (\Exception $e) {
            return $this->errorRes('Failed to retrieve file. ' . $e->getMessage(), 404);
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
            $file = File::findOrFail($id);
            // dd($file);

            $request->validate([
                'name'          => 'required',
                'thumbnail'     => 'nullable|max:2048|mimes:jpg,png',
                'path'          => 'nullable|max:20480|mimes:pdf',
                'divisions'     => 'array',
                'categories'    => 'array',
                'positions'     => 'array',
                'summary'       => 'required'
            ], [
                'name.required'      => 'Name is required.',
                'thumbnail.mimes'    => 'Thumbnail must be a JPG or PNG image.',
                'path.mimes'         => 'File must be a PDF.',
                'summary.required'   => 'Summary is required.',
            ]);

            // Update file details
            $file->name = $request->name;
            $file->summary = $request->summary;

            if ($request->hasFile('thumbnail')) {
                $oldImage = $file->thumbnail;
                if ($oldImage && FacadesFile::exists(public_path('file/thumbnail/' . $oldImage))) {
                    FacadesFile::delete(public_path('file/thumbnail/' . $oldImage));
                }

                //upload thumbnail
                $imageEXT = $request->file('thumbnail')->getClientOriginalName();
                $thumbnailname = pathinfo($imageEXT, PATHINFO_FILENAME);
                $EXT = $request->file('thumbnail')->getClientOriginalExtension();
                $thumbnailimage = $thumbnailname . '_' . time() . '.' . $EXT;
                $paththumbnail = $request->file('thumbnail')->move(public_path('file/thumbnail'), $thumbnailimage);
                $file->thumbnail = $thumbnailimage;
            }

            if ($request->hasFile('path')) {
                $oldPath = $file->path;
                if ($oldPath && FacadesFile::exists(public_path('file/file/' . $oldPath))) {
                    FacadesFile::delete(public_path('file/file/' . $oldPath));
                }

                //upload file
                $imageEXT = $request->file('path')->getClientOriginalName();
                $filename = pathinfo($imageEXT, PATHINFO_FILENAME);
                $EXT = $request->file('path')->getClientOriginalExtension();
                $fileimage = $filename . '_' . time() . '.' . $EXT;
                $path = $request->file('path')->move(public_path('file/file'), $fileimage);
                $file->path = $fileimage;
            }

            $file->save();

            //division
            if ($request->has('divisions')) {
                $file->divisions()->sync($request->divisions);
            }

            //positions
            if ($request->has('positions')) {
                $file->positions()->sync($request->positions);
            }

            //categories
            if ($request->has('categories')) {
                $file->categories()->sync($request->categories);
            }

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User update file | ' . $file->name);
            return $this->successRes('File updated successfully.', $file);
        } catch (\Exception $e) {
            return $this->errorRes('Failed to update file. ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $file = File::findOrFail($id);

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User delete file | ' . $file->name);
            if ($file->thumbnail && $file->path) {
                $oldImage = $file->thumbnail;
                if ($oldImage && File::exists(public_path('file/thumbnail/' . $oldImage))) {
                    FacadesFile::delete(public_path('file/thumbnail/' . $oldImage));
                }

                $oldPath = $file->path;
                if ($oldPath && File::exists(public_path('file/file/' . $oldPath))) {
                    FacadesFile::delete(public_path('file/file/' . $oldPath));
                }
            }

            // Hapus kaitan dengan divisi
            $file->divisions()->detach();

            // Hapus kaitan dengan kategori
            $file->categories()->detach();

            // Hapus kaitan dengan posisi
            $file->positions()->detach();

            $file->delete();
            return $this->successRes('File deleted successfully.', null);
        } catch (\Exception $e) {
            return $this->errorRes('Failed to delete file. ' . $e->getMessage());
        }
    }
}
