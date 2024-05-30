<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasFactory;
    protected $fillable = ['user_id','degree', 'institution','field_of_study','start_date','end_date']; // Feltételezzük, hogy ezek a Language modell töltődhetnek

    public function user()
    {
        return $this->belongsTo(User::class);
    }
   
}
