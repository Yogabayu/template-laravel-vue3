<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
    use HasFactory;
    protected $table = 'divisions';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $fillable = ['id', 'name'];

    public function users()
    {
        return $this->hasMany(User::class);
    }
    public function fileToDivisions()
    {
        return $this->hasMany(FileToDivision::class, 'division_uuid', 'id');
    }

    public function files()
    {
        return $this->belongsToMany(File::class, 'filetodivisions', 'division_uuid', 'file_uuid');
    }
}
