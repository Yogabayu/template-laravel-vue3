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
        'thumbnail',
        'path',
        'summary',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_uuid', 'uuid');
    }

    public function divisions()
    {
        return $this->belongsToMany(Division::class, 'filetodivisions', 'file_uuid', 'division_uuid');
    }

    public function positions()
    {
        return $this->belongsToMany(Position::class, 'filetopositions', 'file_uuid', 'position_uuid');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'filetocategories', 'file_uuid', 'category_uuid');
    }
}
