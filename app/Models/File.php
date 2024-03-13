<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;
    protected $table = 'files';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $fillable = [
        'id',
        'author_uuid',
        'name',
        'path',
        'summary',
        'keywords',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_uuid', 'uuid');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'file_uuid', 'id');
    }
    public function favorite()
    {
        return $this->hasOne(FileFav::class, 'file_uuid', 'id');
    }

    // public function divisions()
    // {
    //     return $this->belongsToMany(Division::class, 'filetodivisions', 'file_uuid', 'division_uuid');
    // }

    public function positions()
    {
        return $this->belongsToMany(Position::class, 'filetopositions', 'file_uuid', 'position_uuid');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'filetocategories', 'file_uuid', 'category_uuid');
    }
}
