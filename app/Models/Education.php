<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasFactory;

    protected $table = 'educations'; 

    protected $fillable = ['user_id','degree', 'institution','field_of_study','start_date','end_date']; 

    public function user()
    {
        return $this->belongsTo(User::class);
    }
   
}
