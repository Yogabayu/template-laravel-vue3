<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DraftComment extends Model
{
    use HasFactory;
    protected $table = 'draft_comments';
    protected $fillable = [
        'draft_id',
        'user_uuid',
        'desc',
        'attachment',
    ];

    public function draft()
    {
        return $this->belongsTo(Draft::class, 'draft_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_uuid', 'uuid');
    }
}
