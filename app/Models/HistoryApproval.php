<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoryApproval extends Model
{
    use HasFactory;
    protected $table = 'history_approvals';
    protected $fillable = ['draft_id', 'position_id', 'approved'];

    public function draft()
    {
        return $this->belongsTo(Draft::class);
    }

    public function position()
    {
        return $this->belongsTo(Position::class, 'position_id');
    }
}
