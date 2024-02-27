<?php

namespace App\Http\Controllers\User;

use App\Helpers\ResponseHelper;
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

            return ResponseHelper::successRes('Berhasil mendapatkan data', $file);
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
                return ResponseHelper::successRes('Dihapus dari favorit', $cekFav);
            } else {
                $fav = FileFav::create([
                    'user_uuid' => auth()->user()->uuid,
                    'file_uuid' => $id,
                ]);
                return ResponseHelper::successRes('Ditambahkan di favorit', $fav);
            }
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
