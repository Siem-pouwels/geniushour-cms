<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentHour extends Model
{
    use HasFactory;
    protected $table = 'student_hours';
    protected $fillable = [
        'user_id',
        'hours'
    ];
}
