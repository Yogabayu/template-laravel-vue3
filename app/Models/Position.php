<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    use HasFactory;
    protected $table = 'positions';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $fillable = ['id', 'name', 'level', 'approval_level_id'];

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
    public function approvalLevel()
    {
        return $this->belongsTo(DraftApprovalLevel::class, 'approval_level_id');
    }
}
