<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FileToDivision extends Model
{
    use HasFactory;
    protected $table = 'filetodivisions';
    protected $fillable = [
        'id',
        'file_uuid',
        'division_uuid',
    ];

    public function file()
    {
        return $this->belongsTo(File::class, 'file_uuid', 'id');
    }

    public function division()
    {
        return $this->belongsTo(Division::class, 'division_uuid', 'id');
    }
}
