<?php

namespace App\Http\Controllers\User;

use App\Helpers\ResponseHelper;
use App\Helpers\UserActivityHelper;
use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\File;
use App\Models\FileFav;
use App\Models\FileView;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class FileController extends Controller
{
    public function detailFile($id)
    {
        try {
            $file = File::with('author', 'categories', 'favorite')->where('id', $id)->first();
            FileView::create([
                'user_uuid' => auth()->user()->uuid,
                'file_uuid' => $id,
                'startTime' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User melihat detail file ' . $file->name);
            return ResponseHelper::successRes('Berhasil mendapatkan data', $file);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function updateTimeSpent(Request $request)
    {
        $fileView = FileView::where('user_uuid', auth()->user()->uuid)->orderBy('id', 'desc')->first();
        $fileView->timespent = $request->timespent;
        $fileView->save();
        return ResponseHelper::successRes('Berhasil update data', $fileView);
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

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User mengirim komentar pada file ' . $request->file_uuid);

            return ResponseHelper::successRes('Berhasil menambahkan komentar', $comment);
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

    public function deleteComment($id)
    {
        try {
            $comment = Comment::findOrFail($id);
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User menghapus komentar pada file ' . $comment->file_uuid);
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

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User mengedit komentar pada file ' . $comment->file_uuid);

            return ResponseHelper::successRes('Komentar berhasil diperbarui', $comment);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function setFavFile($id)
    {
        try {
            $cekFav = FileFav::where('file_uuid', $id)->where('user_uuid', auth()->user()->uuid)->first();
            if ($cekFav) {
                $cekFav->delete();
                UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User unset favorite file ');
                return ResponseHelper::successRes('Dihapus dari favorit', $cekFav);
            } else {
                $fav = FileFav::create([
                    'user_uuid' => auth()->user()->uuid,
                    'file_uuid' => $id,
                ]);
                UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'User set favorite file ' . $fav->file_uuid);
                return ResponseHelper::successRes('Ditambahkan di favorit', $fav);
            }
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
