<?php

namespace App\Http\Controllers\User;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\FileToPosition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchPageController extends Controller
{
    public function index(Request $request)
    {
        //URUNG :: kontroller urung
        try {
            $files = FileToPosition::with('file', 'file.author')
                ->where('position_uuid', auth()->user()->position_id)
                ->where('file.name', $request->name)
                ->get();
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
