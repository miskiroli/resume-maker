<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

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
        'about_me',
        'live_place',
        'phone_number',
       
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
    ];
    
    protected $with=['languages','educations', 'experiences','hobbies','profile_images','skills'];
    
    public function languages() 
{
    return $this->hasMany(Language::class);
}
    public function educations() 
    {
        return $this->hasMany(Education::class);
    }
    public function experiences() 
    {
        return $this->hasMany(Experience::class);
    }
    public function hobbies() 
    {
        return $this->hasMany(Hobbie::class);
    }
    public function profile_images() 
    {
        return $this->hasMany(ProfileImage::class);
    }
    public function skills() 
    {
        return $this->hasMany(Skill::class);
    }
}
