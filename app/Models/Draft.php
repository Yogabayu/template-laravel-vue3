<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Draft extends Model
{
    use HasFactory;
    protected $table = 'drafts';
    protected $fillable = [
        'user_uuid',
        'title',
        'desc',
        'file',
        'status',
        'required_approvals',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_uuid', 'uuid');
    }
    public function comments()
    {
        return $this->hasMany(DraftComment::class, 'draft_id');
    }
    public function positions()
    {
        return $this->belongsToMany(Position::class, 'draft_approval_mappings', 'draft_id', 'position_id')->withPivot('is_approved', 'id');
    }
    public function draftActivities()
    {
        return $this->hasMany(DraftActivity::class, 'draft_id');
    }
}
