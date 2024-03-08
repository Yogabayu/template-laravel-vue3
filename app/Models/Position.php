<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    use HasFactory;
    protected $table = 'positions';
    protected $primaryKey = 'id'; // Change 'division_id' to your actual primary key column name
    public $incrementing = false;
    protected $fillable = ['id', 'name', 'level'];

    public function fileToPositions()
    {
        return $this->hasMany(FileToPosition::class, 'position_uuid', 'id');
    }

    public function files()
    {
        return $this->belongsToMany(File::class, 'filetopositions', 'position_uuid', 'file_uuid');
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
