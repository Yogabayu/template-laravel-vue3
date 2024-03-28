<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'photo',
        'isActive',
        'isAdmin',
        'canDownload',
        'canPrint',
        'canComment',
        'position_id',
        'division_id',
        'nik',
        'uuid',
        'fcm_token',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function position()
    {
        return $this->belongsTo(Position::class);
    }

    // public function division()
    // {
    //     return $this->belongsTo(Division::class);
    // }

    public function file()
    {
        return $this->belongsTo(File::class);
    }

    public function activity()
    {
        return $this->hasMany(UserActivity::class, 'user_uuid', 'uuid');
    }
    public function fileviews()
    {
        return $this->hasMany(FileView::class, 'user_uuid', 'uuid');
    }
    public function filefavorites()
    {
        return $this->hasMany(FileFavorite::class, 'user_uuid', 'uuid');
    }

    public function devices()
    {
        return $this->hasMany(DeviceVerification::class, 'user_uuid', 'uuid');
    }

    public function drafts()
    {
        return $this->hasMany(Draft::class, 'user_uuid', 'uuid');
    }
}
