<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\DraftApprovalLevel;
use Illuminate\Http\Request;

class DraftApprovalLevelController extends Controller
{
    public function index()
    {
        try {
            $draft = DraftApprovalLevel::all();

            return ResponseHelper::successRes('Berhasil mendapatkan data', $draft);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes('Error Undefined ' . $e->getMessage());
        }
    }
}
