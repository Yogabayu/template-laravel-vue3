<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FileFav extends Model
{
    use HasFactory;
    protected $table = "filefavorites";
    protected $fillable = [
        'user_uuid',
        'file_uuid',
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
