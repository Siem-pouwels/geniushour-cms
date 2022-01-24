<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function getStudents()
    {
        return response()->json(User::where('role', '=', 'student')->get());
    }

    public function getTeachers()
    {
        return response()->json(User::where('role', '=', 'teacher')->get());
    }
}
