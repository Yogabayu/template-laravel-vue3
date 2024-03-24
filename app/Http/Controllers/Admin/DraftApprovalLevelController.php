<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\DraftApprovalLevel;
use Illuminate\Http\Request;

class DraftApprovalLevelController extends Controller
{
    public function index(Request $request)
    {
        try {
            $drafts = DraftApprovalLevel::all();

            return ResponseHelper::successRes('Berhasil Mendapatkan data', $drafts);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
