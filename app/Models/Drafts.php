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
}
