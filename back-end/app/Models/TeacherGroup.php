<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherGroup extends Model
{
    use HasFactory;
    protected $table = 'teachergroups';
    protected $fillable = [
        'group_id',
        'user_id',
    ];
}
