<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DraftActivity extends Model
{
    use HasFactory;
    protected $table = 'draft_activities';
    protected $fillable = [
        'user_uuid',
        'draft_id',
        'desc',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_uuid', 'uuid');
    }

    public function draft()
    {
        return $this->belongsTo(Draft::class, 'draft_id');
    }
}
