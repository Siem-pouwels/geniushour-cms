<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectProgress extends Model
{
    use HasFactory;
    protected $table = 'projectprogress';
    protected $fillable = [
        'finished',
        'amountofhours',
        'title',
        'description',
        'teachergroups_id',
        'studentgroups_id',
        'project_id'
    ];
}
