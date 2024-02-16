<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
    use HasFactory;
    protected $table = 'divisions';
    protected $primaryKey = 'id'; // Change 'division_id' to your actual primary key column name
    public $incrementing = false;
    protected $fillable = ['id', 'name'];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
