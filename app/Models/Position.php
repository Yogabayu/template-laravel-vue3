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
    protected $fillable = ['id', 'name'];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
