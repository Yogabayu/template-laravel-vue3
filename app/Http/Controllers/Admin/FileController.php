<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ResponseHelper;
use App\Helpers\UserActivityHelper;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Division;
use App\Models\File;
use App\Models\FileToCategory;
use App\Models\FileToDivision;
use App\Models\FileToPosition;
use App\Models\FileView;
use App\Models\Position;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File as FacadesFile;
use Illuminate\Support\Str;
use Kreait\Firebase\Messaging\Notification;
use Kreait\Firebase\Messaging\CloudMessage;

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

    public function filePerPosition()
    {
        try {
            $datas = Position::withCount('files')->with('files')->get();

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'Mengakses data file per posisi');

            return ResponseHelper::successRes('Berhasil mendapatkan data', $datas);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function filePerPositionId($id)
    {
        try {
            $file = FileToPosition::with('file', 'file.author', 'file.categories', 'position')->where('position_uuid', $id)->get();
            $position = Position::where('id', $id)->first();

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'Mengakses data file dengan posisi : ' . $position->name);

            return response()->json([
                'success' => true,
                'message' => 'Berhasil mendapatkan data',
                'data' => [
                    'file' => $file,
                    'position' => $position
                ]
            ]);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function filePerCategoryId($id)
    {
        try {
            $file = FileToCategory::with('file', 'file.author', 'file.positions', 'category')->where('category_uuid', $id)->get();
            $category = Category::where('id', $id)->first();

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'Mengakses data file per kategori : ' . $category->name);

            return response()->json([
                'success' => true,
                'message' => 'Berhasil mendapatkan data',
                'data' => [
                    'file' => $file,
                    'category' => $category
                ]
            ]);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    // public function filePerDivisionId($id)
    // {
    //     try {
    //         $files = Division::with('files', 'files.positions', 'files.categories', 'files.author')
    //             ->where('id', $id)
    //             ->first();

    //         return ResponseHelper::successRes('berhasil mendapatkan data', $files);
    //     } catch (\Exception $e) {
    //         return ResponseHelper::errorRes($e->getMessage());
    //     }
    // }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $files = File::with('author', 'positions', 'categories')->orderBy('created_at', 'desc')->get();

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'Mengakses semua data file');
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
                'path'          => 'required|max:20480|mimes:pdf',
                'categories'    => 'required|array',
                'positions'     => 'required|array',
                'summary'       => 'required',
                'keywords'       => 'required'
            ], [
                'name.required'      => 'Nama wajib diisi.',
                'path.required'      => 'File wajib diunggah.',
                'path.mimes'         => 'File harus berformat PDF.',
                'categories.required' => 'Kategori wajib dipilih.',
                'positions.required' => 'Posisi wajib dipilih.',
                'summary.required'   => 'Ringkasan wajib diisi.',
                'keywords.required'   => 'Keyword wajib diisi.',
            ]);

            $file = new File();
            $file->id = Str::uuid();
            $file->author_uuid = auth()->user()->uuid;
            $file->name = $request->name;
            $file->summary = $request->summary;
            $file->keywords = $request->keywords;

            //upload file
            $imageEXT = $request->file('path')->getClientOriginalName();
            $filename = pathinfo($imageEXT, PATHINFO_FILENAME);
            $EXT = $request->file('path')->getClientOriginalExtension();
            $fileimage = $filename . '_' . time() . '.' . $EXT;
            $path = $request->file('path')->move(public_path('file/file'), $fileimage);
            $file->path = $fileimage;

            $file->save();

            $fcm_tokens = [];

            $positions = $request->positions;
            if (in_array('all', $positions)) {
                $allPositions = Position::all();
                foreach ($allPositions as $pos) {
                    $posisionMapping = new FileToPosition();
                    $posisionMapping->file_uuid = $file->id;
                    $posisionMapping->position_uuid = $pos->id;
                    $posisionMapping->save();
                    $users = User::where('position_id', $pos)
                        ->whereNotNull('fcm_token')
                        ->pluck('fcm_token');
                    $fcm_tokens = array_merge($fcm_tokens, $users->toArray());
                }
            } else {
                foreach ($positions as $pos) {
                    $posisionMapping = new FileToPosition();
                    $posisionMapping->file_uuid = $file->id;
                    $posisionMapping->position_uuid = $pos;
                    $posisionMapping->save();
                    $users = User::where('position_id', $pos)
                        ->whereNotNull('fcm_token')
                        ->pluck('fcm_token');
                    $fcm_tokens = array_merge($fcm_tokens, $users->toArray());
                }
            }

            $categories = $request->categories;
            foreach ($categories as $cat) {
                $categoryMapping = new FileToCategory();
                $categoryMapping->file_uuid = $file->id;
                $categoryMapping->category_uuid = $cat;
                $categoryMapping->save();
            }
            dd($fcm_tokens);
            foreach ($fcm_tokens as $token) {
                $messaging = app('firebase.messaging');
                $notification = Notification::create('File Baru Untuk Anda ', $file->name . ' Telah Ditambahkan');
                $message = CloudMessage::withTarget('token', $token)
                    ->withNotification($notification);
                $messaging->send($message);
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
            $file = File::with('author', 'positions', 'categories')->where('id', $id)->first();
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'Mengakses data file | ' . $file->name);
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

            $request->validate([
                'name'          => 'required',
                'path'          => 'nullable|max:20480|mimes:pdf',
                'categories'    => 'array',
                'positions'     => 'array',
                'summary'       => 'required'
            ], [
                'name.required'      => 'Name is required.',
                'path.mimes'         => 'File must be a PDF.',
                'summary.required'   => 'Summary is required.',
            ]);

            // Update file details
            $file->name = $request->name;
            $file->summary = $request->summary;
            if ($request->has('keywords')) {
                $file->keywords = $request->keywords;
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
            if ($file->path) {
                $oldPath = $file->path;
                if ($oldPath && File::exists(public_path('file/file/' . $oldPath))) {
                    FacadesFile::delete(public_path('file/file/' . $oldPath));
                }
            }

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

    public function mostView()
    {
        try {
            $most = DB::table('fileviews')
                ->select('files.id', 'files.name', 'files.summary', 'users.name as username', 'files.path', DB::raw('COUNT(fileviews.id) AS views_count'))
                ->join('files', 'fileviews.file_uuid', '=', 'files.id')
                ->join('users', 'files.author_uuid', '=', 'users.uuid')
                ->join('positions', 'users.position_id', '=', 'positions.id')
                ->groupBy('files.id', 'files.name', 'users.name', 'files.summary', 'users.name', 'files.path')
                ->orderByDesc('views_count')
                ->take(6)
                ->get();

            return ResponseHelper::successRes('Berhasil mendapatkan data', $most);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function fileViewsByid($id)
    {
        try {
            $userList = DB::table('fileviews')
                ->join('users', 'fileviews.user_uuid', '=', 'users.uuid')
                ->join('files', 'fileviews.file_uuid', '=', 'files.id')
                ->join('positions', 'users.position_id', '=', 'positions.id')
                ->select('users.name', 'positions.name as posname', DB::raw('COUNT(fileviews.id) AS count_views'), DB::raw('MAX(fileviews.created_at) AS latest_view'))
                ->where('fileviews.file_uuid', $id)
                ->groupBy('users.name', 'positions.name')
                ->get();

            $file = File::findOrFail($id);
            return response()->json([
                'success' => true,
                'message' => 'Berhasil mendapatkan data',
                'data' => [
                    'detailFile' => $file,
                    'userList' => $userList,
                ]
            ]);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function historyFilePerUser($id)
    {
        try {
            $fileList = DB::table('fileviews')
                ->join('users', 'fileviews.user_uuid', '=', 'users.uuid')
                ->join('files', 'fileviews.file_uuid', '=', 'files.id')
                ->join('positions', 'users.position_id', '=', 'positions.id')
                ->select('files.id', 'files.name', 'files.path', 'files.summary', 'users.name as username', DB::raw('MAX(fileviews.created_at) AS latest_view'))
                ->where('fileviews.user_uuid', $id)
                ->groupBy('files.id', 'files.name', 'files.path', 'files.summary', 'users.name')
                ->get();

            $user = User::where('uuid', $id)->first();
            return response()->json([
                'success' => true,
                'message' => 'Berhasil mendapatkan data',
                'data' => [
                    'fileList' => $fileList,
                    'detailUser' => $user,
                ]
            ]);
        } catch (\Exception $e) {
            return $this->errorRes('Failed to retrieve files. ' . $e->getMessage());
        }
    }

    public function getHistoryAccessUser(Request $request)
    {
        try {
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'Melihat histori akses user');
            $history = FileView::with('user', 'file')
                ->where('user_uuid', $request->uuid)
                ->where('file_uuid', $request->fileid)
                ->orderBy('created_at', 'DESC')
                ->get();
            return ResponseHelper::successRes('Berhasil mendapatkan data', $history);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function getFileComment($id)
    {
        try {
            $comment = Comment::with('user', 'user.position')->where('file_uuid', $id)->orderBy('created_at', 'desc')->get();

            return ResponseHelper::successRes('Berhasil mendapatkan data', $comment);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function sendComment(Request $request)
    {
        try {
            $request->validate([
                'file_uuid' => 'required',
                'desc' => 'required',
            ], [
                'file_uuid.required' => 'File UUID is required.',
                'desc.required' => 'Description is required.',
            ]);

            $comment = Comment::create([
                'uuid' => Str::uuid(),
                'user_uuid' => auth()->user()->uuid,
                'file_uuid' => $request->file_uuid,
                'desc'      => $request->desc,
            ]);

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'Admin mengirim komentar pada file ' . $request->file_uuid);

            return ResponseHelper::successRes('Berhasil menambahkan komentar', $comment);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function deleteComment($id)
    {
        try {
            $comment = Comment::findOrFail($id);
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'Admin menghapus komentar pada file ' . $comment->file_uuid);
            $comment->delete();
            return ResponseHelper::successRes('Berhasil menghapus komentar', $comment);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function editComment(Request $request, $id)
    {
        try {
            $request->validate([
                'desc' => 'required'
            ]);

            $comment = Comment::findOrFail($id);
            $comment->desc = $request->desc;
            $comment->save();

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'Admin mengedit komentar pada file ' . $comment->file_uuid);

            return ResponseHelper::successRes('Komentar berhasil diperbarui', $comment);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
