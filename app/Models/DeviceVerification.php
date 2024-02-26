<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeviceVerification extends Model
{
    use HasFactory;
    protected $table = "deviceVerifications";
    protected $fillable = [
        'id',
        'user_uuid',
        'deviceName',
        'ip',
        'verificationCode',
        'isVerified',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'user_uuid', 'uuid');
    }
}
