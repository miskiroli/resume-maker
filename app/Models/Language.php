<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    use HasFactory;
    protected $table = 'languages'; // Specify the table name if it differs from the convention

    protected $fillable = ['user_id','name', 'level']; 

    public function user()
    {
        return $this->belongsTo(User::class);
    }
   
}
