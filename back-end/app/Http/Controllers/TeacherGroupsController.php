<?php

namespace App\Http\Controllers;

use App\Models\TeacherGroup;
use Illuminate\Http\Request;

class TeacherGroupsController extends Controller
{
    public function get()
    {
        return response()->json(TeacherGroup::get());
    }
}
