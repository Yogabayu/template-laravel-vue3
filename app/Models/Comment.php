<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $table = "comments";
    protected $primaryKey = 'uuid';
    public $incrementing = false;
    protected $fillable = [
        'uuid',
        'user_uuid',
        'file_uuid',
        'desc',
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_uuid', 'uuid');
    }

    public function file()
    {
        return $this->belongsTo(File::class, 'file_uuid', 'id');
    }
}
