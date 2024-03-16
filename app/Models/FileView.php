<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FileView extends Model
{
    use HasFactory;
    protected $table = 'fileviews';
    protected $fillable = [
        'user_uuid',
        'file_uuid',
        'startTime',
        'endTime',
        'timespent'
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
