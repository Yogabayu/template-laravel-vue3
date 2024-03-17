<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DraftApprovalLevel extends Model
{
    use HasFactory;
    protected $table = 'draft_approval_levels';
    protected $fillable = [
        'name',
        'desc',
        'canUpload',
        'canEdit',
        'canComment',
    ];

    public function positions()
    {
        return $this->hasMany(Position::class, 'draft_approval_level_id');
    }
}
