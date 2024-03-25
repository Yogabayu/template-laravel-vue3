<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\DraftActivityHelper;
use App\Helpers\ResponseHelper;
use App\Helpers\UserActivityHelper;
use App\Http\Controllers\Controller;
use App\Models\Draft;
use App\Models\DraftApprovalMapping;
use App\Models\DraftComment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Kreait\Firebase\Exception\MessagingException;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;

class DraftController extends Controller
{
    public function index(Request $request)
    {
        try {
            $drafts = Draft::with('user', 'positions')
                ->get();

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'user mendapatkan data draft');

            return ResponseHelper::successRes('Berhasil Mendapatkan data', $drafts);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required',
                'file' => 'mimes:pdf,doc,docx|required',
                'positions'     => 'required|array',
            ], [
                'title.required' => 'Judul wajib diisi.',
                'file.required' => 'file wajib diisi.',
                'file.mimes' => 'file wajib berformat pdf / doc / docx.',
                'positions.required' => 'Posisi wajib diisi.',
            ]);

            $count_require_approval = count($request->positions);

            $draft = new Draft();
            $draft->user_uuid = auth()->user()->uuid;
            $draft->title = $request->title;
            $draft->desc = $request->desc;
            $draft->status = 'pending';
            $draft->required_approvals = $count_require_approval;

            //upload file
            $imageEXT = $request->file('file')->getClientOriginalName();
            $filename = pathinfo($imageEXT, PATHINFO_FILENAME);
            $EXT = $request->file('file')->getClientOriginalExtension();
            $filepath = $filename . '_' . time() . '.' . $EXT;
            $path = $request->file('file')->move(public_path('draft'), $filepath);
            $draft->file = $filepath;

            $draft->save();
            $fcm_tokens = [];

            $positions = $request->positions;
            foreach ($positions as $pos) {
                $posisionMapping = new DraftApprovalMapping();
                $posisionMapping->draft_id = $draft->id;
                $posisionMapping->position_id = $pos;
                $posisionMapping->is_approved = false;
                $posisionMapping->save();

                $users = User::where('position_id', $pos)
                    ->whereNotNull('fcm_token')
                    ->pluck('fcm_token');
                $fcm_tokens = array_merge($fcm_tokens, $users->toArray());
            }

            foreach ($fcm_tokens as $token) {
                try {
                    $messaging = app('firebase.messaging');
                    $notification = Notification::create('Draft Baru ', $draft->title . ' Telah Ditambahkan, silahkan di lakukan pengecekan');
                    $message = CloudMessage::withTarget('token', $token)
                        ->withNotification($notification);
                    $messaging->send($message);
                } catch (MessagingException $ex) {
                    error_log('Failed to send notification to token: ' . $token . '. Error: ' . $ex->getMessage());
                }
            }

            DraftActivityHelper::draftActivity(auth()->user()->uuid, $draft->id, 'Membuat Draft Baru :' . $draft->title);
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'user menambahkan draft ' . $draft->title);
            return ResponseHelper::successRes('Berhasil Mendapatkan data', $draft);
        } catch (\Exception $e) {
            DraftActivityHelper::draftActivity(auth()->user()->uuid, $draft->id, 'Gagal Membuat Draft : ' . $request->title);
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'gagal user menambahkan draft ' . $request->title);
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $draft = Draft::findOrFail($id);

            $request->validate([
                'file' => 'mimes:pdf,doc,docx',
                'positions'     => 'array',
            ], [
                'file.mimes' => 'file wajib berformat pdf / doc / docx.'
            ]);


            $draft->user_uuid = auth()->user()->uuid;
            $draft->title = $request->title;
            $draft->desc = $request->desc ?? $draft->desc;
            if ($request->has('status')) {
                if ($request->status == 'approved') {
                    $count = DraftApprovalMapping::where('draft_id', $draft->id)->where('is_approved', true)->count();
                    if ($count == $draft->required_approvals) {
                        $draft->status = $request->status;

                        $fcm_tokens = [];
                        $draftPositions = DraftApprovalMapping::where('draft_id', $draft->id)->select('position_id')->get();

                        foreach ($draftPositions as $position) {
                            $users = User::where('position_id', $position->position_id)
                                ->whereNotNull('fcm_token')
                                ->pluck('fcm_token');
                            $fcm_tokens = array_merge($fcm_tokens, $users->toArray());
                        }
                        foreach ($fcm_tokens as $token) {
                            try {
                                $messaging = app('firebase.messaging');
                                $notification = Notification::create('Status Draft diubah :' . $request->status, 'silahkan di lakukan pengecekan :' . $draft->title);
                                $message = CloudMessage::withTarget('token', $token)
                                    ->withNotification($notification);
                                $messaging->send($message);
                            } catch (MessagingException $ex) {
                                error_log('Failed to send notification to token: ' . $token . '. Error: ' . $ex->getMessage());
                            }
                        }
                    } else {
                        return ResponseHelper::errorRes('Belum semua Approval Disetujui');
                    }
                }
                $draft->status = $request->status ?? 'pending';
            }

            if ($request->has('positions')) {
                $count_require_approval = count($request->positions);
                $draft->required_approvals = $count_require_approval;
            }

            if ($request->hasFile('file')) {
                $oldPath = $draft->file;
                if ($oldPath && File::exists(public_path('draft/' . $oldPath))) {
                    File::delete(public_path('draft/' . $oldPath));
                }

                $imageEXT = $request->file('file')->getClientOriginalName();
                $filename = pathinfo($imageEXT, PATHINFO_FILENAME);
                $EXT = $request->file('file')->getClientOriginalExtension();
                $filepath = $filename . '_' . time() . '.' . $EXT;
                $path = $request->file('file')->move(public_path('draft'), $filepath);
                $draft->file = $filepath;
            }
            $draft->save();

            //positions
            if ($request->has('positions')) {
                $draft->positions()->detach();
                $draft->positions()->sync($request->positions);
            }
            DraftActivityHelper::draftActivity(auth()->user()->uuid, $draft->id, 'Edit Draft :' . $draft->title);
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'user merubah draft ' . $draft->title);
            return ResponseHelper::successRes('Berchapai Mendapatkan data', $draft);
        } catch (\Exception $e) {
            DraftActivityHelper::draftActivity(auth()->user()->uuid, $draft->id, 'Gagal Merubah Draft : ' . $request->title);
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'user gagal merubah draft ' . $request->title);
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function destroy(string $id)
    {
        try {
            $draft = Draft::findOrFail($id);
            DraftActivityHelper::draftActivity(auth()->user()->uuid, $draft->id, 'Hapus Draft :' . $draft->title);
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'user melakukan hapus draft ' . $draft->title);
            if ($draft->file) {
                $oldPath = $draft->file;
                if ($oldPath && File::exists(public_path('draft/' . $draft->title . '/' . $oldPath))) {
                    File::delete(public_path('draft/' . $draft->title . '/' . $oldPath));
                }
            }
            $draft->positions()->detach();
            $draft->draftActivities()->delete();
            $draft->comments()->delete();
            $draft->delete();

            return ResponseHelper::successRes('Berhasil Mendapatkan data', $draft);
        } catch (\Exception $e) {
            DraftActivityHelper::draftActivity(auth()->user()->uuid, $draft->id, 'Gagal Menghapus Draft : ' . $id);
            UserActivityHelper::logLoginActivity(auth()->user()->uuid,  'user gagal menghapus draft ' . $id);
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function changeStatusDraft($id)
    {
        try {
            $draft = Draft::findOrFail($id);

            if ($draft->status == 'approved') {
                $draft->status = 'pending';
                $draft->save();

                DraftActivityHelper::draftActivity(auth()->user()->uuid, $draft->id, 'Mengubah Status Draft : ' . $draft->title);
                UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'user melakukan mengubah draft menjadi pending draft ' . $draft->title);
                return ResponseHelper::successRes('Berhasil Update data', $draft);
            }

            $draft->status = 'approved';
            $draft->save();

            $draftMaps = DraftApprovalMapping::where('draft_id', $draft->id)->get();
            foreach ($draftMaps as $draftMap) {
                $draftMap->is_approved = true;
                $draftMap->save();
            }

            $fcm_tokens = [];
            $draftPositions = DraftApprovalMapping::where('draft_id', $draft->id)->select('position_id')->get();

            foreach ($draftPositions as $position) {
                $users = User::where('position_id', $position->position_id)
                    ->whereNotNull('fcm_token')
                    ->pluck('fcm_token');
                $fcm_tokens = array_merge($fcm_tokens, $users->toArray());
            }
            foreach ($fcm_tokens as $token) {
                try {
                    $messaging = app('firebase.messaging');
                    $notification = Notification::create('Status Draft diubah ', $draft->title . ' silahkan di lakukan pengecekan');
                    $message = CloudMessage::withTarget('token', $token)
                        ->withNotification($notification);
                    $messaging->send($message);
                } catch (MessagingException $ex) {
                    error_log('Failed to send notification to token: ' . $token . '. Error: ' . $ex->getMessage());
                }
            }

            DraftActivityHelper::draftActivity(auth()->user()->uuid, $draft->id, 'Mengubah Status Draft menjadi disetujui : ' . $draft->title);
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'draft telah disetujui : ' . $draft->title);
            return ResponseHelper::successRes('Berhasil Update data', $draft);
        } catch (\Exception $e) {

            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'user gagal merubah status draft ' . $id);
            return ResponseHelper::errorRes($e->getMessage());
        }
    }


    //======  detail draft ======
    public function detailDraft($id)
    {
        try {
            $draft = Draft::with(['positions', 'user', 'comments', 'draftActivities' => function ($query) {
                $query->orderBy('created_at', 'desc');
            }, 'comments.user', 'user.position', 'draftActivities.user'])->findOrFail($id);

            DraftActivityHelper::draftActivity(auth()->user()->uuid, $draft->id, 'Melihat Detail Draft : ' . $draft->title);
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'user melihat detail draft:  ' . $draft->title);

            return ResponseHelper::successRes('Berhasil mendapatkan data', $draft);
        } catch (\Exception $e) {
            $draft = Draft::with(['positions', 'user', 'comments', 'draftActivities' => function ($query) {
                $query->orderBy('created_at', 'desc');
            }, 'comments.user', 'user.position', 'draftActivities.user'])->findOrFail($id);
            DraftActivityHelper::draftActivity(auth()->user()->uuid, $draft->id, 'gagal Melihat Detail Draft : ' . $id);
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'gagal user melihat detail draft:  ' . $draft->title);
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function changePosApprove(Request $request)
    {
        try {
            $user = auth()->user();
            $change = DraftApprovalMapping::findOrFail($request->id);
            // if ($user->position_id != $change->position_id) {
            //     DraftActivityHelper::draftActivity(auth()->user()->uuid, $change->draft_id, 'Gagal Mengganti Status Approve : ' . $change->draft_id);
            //     UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'user mencoba mengganti status approve file' . $change->draft_id);
            //     return ResponseHelper::errorRes('Posisi anda berbeda dengan posisi yang diizinkan. Silahkan coba kembali');
            // }
            $change->is_approved = $request->statusPosProv;
            $change->save();

            $draftId = $change->draft_id;
            $draft = Draft::findOrFail($draftId);
            $draft->status = 'approved';
            $draft->save();

            $fcm_tokens = [];
            $draftPositions = DraftApprovalMapping::where('draft_id', $draft->id)->select('position_id')->get();

            foreach ($draftPositions as $position) {
                $users = User::where('position_id', $position->position_id)
                    ->whereNotNull('fcm_token')
                    ->pluck('fcm_token');
                $fcm_tokens = array_merge($fcm_tokens, $users->toArray());
            }
            foreach ($fcm_tokens as $token) {
                try {
                    $messaging = app('firebase.messaging');
                    $notification = Notification::create('Status Draft diubah ', $draft->title . ' silahkan di lakukan pengecekan');
                    $message = CloudMessage::withTarget('token', $token)
                        ->withNotification($notification);
                    $messaging->send($message);
                } catch (MessagingException $ex) {
                    error_log('Failed to send notification to token: ' . $token . '. Error: ' . $ex->getMessage());
                }
            }
            DraftActivityHelper::draftActivity(auth()->user()->uuid, $draft->id, 'Mengubah Status Draft menjadi disetujui : ' . $draft->title);
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'Draft otomatis disetujui oleh sistem karena telah memenuhi syarat' . $draft->title);


            return ResponseHelper::successRes('Berhasil', $change);
        } catch (\Exception $e) {
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'user gagal menyetujui draft: ' . $draft->title);
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function addDraftComment(Request $request)
    {
        try {
            $request->validate([
                'draft_id' => 'required',
                'desc' => 'required',
                'attachment' => 'mimes:pdf,doc,docx,xlx,xlsx',
            ], [
                'draft_id.required' => 'Draft_id wajib diisi.',
                'desc.required' => 'Deskripsi wajib diisi.',
                'attachment.required' => 'File wajib berformat pdf / doc / docx / xlx / xlsx.',
            ]);
            $comment = new DraftComment();
            $comment->draft_id = $request->draft_id;
            $comment->user_uuid = auth()->user()->uuid;
            $comment->desc = $request->desc;

            if ($request->hasFile('attachment')) {
                //attachment
                $imageEXT = $request->file('attachment')->getClientOriginalName();
                $filename = pathinfo($imageEXT, PATHINFO_FILENAME);
                $EXT = $request->file('attachment')->getClientOriginalExtension();
                $filepath = $filename . '_' . time() . '.' . $EXT;
                $path = $request->file('attachment')->move(public_path('draft/comment'), $filepath);
                $comment->attachment = $filepath;
            }

            $comment->save();

            $draft = Draft::findOrFail($request->draft_id);
            $fcm_tokens = [];
            $draftPositions = DraftApprovalMapping::where('draft_id', $draft->id)->select('position_id')->get();

            foreach ($draftPositions as $position) {
                $users = User::where('position_id', $position->position_id)
                    ->whereNotNull('fcm_token')
                    ->pluck('fcm_token');
                $fcm_tokens = array_merge($fcm_tokens, $users->toArray());
            }
            foreach ($fcm_tokens as $token) {
                try {
                    $messaging = app('firebase.messaging');
                    $notification = Notification::create('Ada Komentar ditambahkan', $draft->title . ' silahkan di lakukan pengecekan');
                    $message = CloudMessage::withTarget('token', $token)
                        ->withNotification($notification);
                    $messaging->send($message);
                } catch (MessagingException $ex) {
                    error_log('Failed to send notification to token: ' . $token . '. Error: ' . $ex->getMessage());
                }
            }


            DraftActivityHelper::draftActivity(auth()->user()->uuid, $comment->draft_id, 'Menambahkan komen pada draft: ' . $comment->draft_id);
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'user manambahkan komen pada draft: ' . $comment->draft_id);
            return ResponseHelper::successRes('Berhasil menambahkan komentar', $comment);
        } catch (\Exception $e) {
            DraftActivityHelper::draftActivity(auth()->user()->uuid, $request->draft_id, 'Gagal menambahkan komen pada draft: ' . $request->draft_id);
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'user gagal menambahkan komentar pada draft: ' . $request->draft_id);
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function updateDraftComment(Request $request, $id)
    {
        try {
            $request->validate([
                'desc' => 'required',
                'attachment' => 'mimes:pdf,doc,docx,xlx,xlsx',
            ], [
                'desc.required' => 'Deskripsi wajib diisi.',
                'attachment.mimes' => 'File wajib berformat pdf / doc / docx / xlx / xlsx.',
            ]);
            $comment = DraftComment::findOrFail($id);
            $comment->desc = $request->desc;

            if ($request->hasFile('attachment')) {
                $oldPath = $comment->attachment;
                if ($oldPath && File::exists(public_path('draft/comment/'  . $oldPath))) {
                    File::delete(public_path('draft/comment/' . $oldPath));
                }
                //attachment
                $imageEXT = $request->file('attachment')->getClientOriginalName();
                $filename = pathinfo($imageEXT, PATHINFO_FILENAME);
                $EXT = $request->file('attachment')->getClientOriginalExtension();
                $filepath = $filename . '_' . time() . '.' . $EXT;
                $path = $request->file('attachment')->move(public_path('draft/comment'), $filepath);
                $comment->attachment = $filepath;
            }

            $comment->save();

            DraftActivityHelper::draftActivity(auth()->user()->uuid, $comment->draft_id, 'Mengubah komentar pada draft: ' . $comment->draft_id);
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'user mengubah komentar pada draft: ' . $comment->draft_id);
            return ResponseHelper::successRes('Berhasil update komentar', $comment);
        } catch (\Exception $e) {
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'user gagal mengubah komentar pada draft: ' . $request->draft_id);
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function deleteDraftComment($id)
    {
        try {
            $comment = DraftComment::findOrFail($id);
            if ($comment->attachment) {
                $oldPath = $comment->attachment;
                if ($oldPath && File::exists(public_path('draft/comment/'  . $oldPath))) {
                    File::delete(public_path('draft/comment/' . $oldPath));
                }
            }
            $comment->delete();

            DraftActivityHelper::draftActivity(auth()->user()->uuid, $comment->draft_id, 'Menghapus komentar pada draft: ' . $comment->draft_id);
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'user menghapus komentar pada draft: ' . $comment->draft_id);
            return ResponseHelper::successRes('Komentar dihapus', $comment);
        } catch (\Exception $e) {
            UserActivityHelper::logLoginActivity(auth()->user()->uuid, 'user gagal menghapus komentar pada draft ');
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
