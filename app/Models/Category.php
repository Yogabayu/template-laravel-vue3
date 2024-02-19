<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $table = 'categories';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $fillable = ['id', 'name'];


    public function fileToPositions()
    {
        return $this->hasMany(FileToPosition::class, 'category_uuid', 'id');
    }

    public function files()
    {
        return $this->belongsToMany(File::class, 'filetocategories', 'category_uuid', 'file_uuid');
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
