<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FileToCategory extends Model
{
    use HasFactory;
    protected $table = 'filetocategories';
    protected $fillable = [
        'id',
        'file_uuid',
        'category_uuid',
    ];

    public function file()
    {
        return $this->belongsTo(File::class, 'file_uuid', 'id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_uuid', 'id');
    }
}
