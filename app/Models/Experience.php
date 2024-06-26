<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;
    protected $table = 'experiences'; 

    protected $fillable = ['user_id','company', 'position','description','start_date','end_date']; 

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
}
