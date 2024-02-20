<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\File;
use App\Models\User;
use Illuminate\Http\Request;

class HelperController extends Controller
{
    public function totalFile()
    {
        try {
            $total = File::count();

            return ResponseHelper::successRes('Berhasil Mendapatkan data', $total);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
    public function totalUser()
    {
        try {
            $total = User::count();

            return ResponseHelper::successRes('Berhasil Mendapatkan data', $total);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
