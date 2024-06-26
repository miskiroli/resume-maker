<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hobbie extends Model
{
    use HasFactory;
    protected $table = 'hobbies'; 

    protected $fillable = ['user_id','name', 'description']; 

    public function user()
    {
        return $this->belongsTo(User::class);
    }
   
    
}
