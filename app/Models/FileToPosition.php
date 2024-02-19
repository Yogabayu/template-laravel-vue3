<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FileToPosition extends Model
{
    use HasFactory;
    protected $table = 'filetopositions';
    protected $fillable = [
        'id',
        'file_uuid',
        'position_uuid',
    ];

    public function file()
    {
        return $this->belongsTo(File::class, 'file_uuid', 'id');
    }

    public function position()
    {
        return $this->belongsTo(Position::class, 'position_uuid', 'id');
    }
}
