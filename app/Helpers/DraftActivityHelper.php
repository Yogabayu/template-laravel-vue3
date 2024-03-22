<?php

namespace App\Helpers;

use App\Models\DraftActivity;

class DraftActivityHelper
{
    public static function draftActivity($userUuid, $draftId, $message)
    {
        DraftActivity::create([
            'user_uuid' => $userUuid,
            'draft_id' => $draftId,
            'desc' => $message,
        ]);
    }
}
