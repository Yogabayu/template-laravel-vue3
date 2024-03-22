<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DraftApprovalMapping extends Model
{
    use HasFactory;
    protected $table = 'draft_approval_mappings';
    protected $fillable = ['draft_id', 'position_id', 'is_approved'];

    public function draft()
    {
        return $this->belongsTo(Draft::class);
    }

    public function position()
    {
        return $this->belongsTo(Position::class, 'position_id', 'id');
    }
}
