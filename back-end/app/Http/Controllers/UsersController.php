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

    public function getDropdownStudents()
    {
        $users = User::where('role', '=', 'student')->get();
        $users->each(function ($model) {
            $model->setAppends(['full_name']);
        });
        return response()->json($users);
    }

    public function getDropdownTeachers()
    {
        $users = User::where('role', '=', 'teacher')->get();
        $users->each(function ($model) {
            $model->setAppends(['full_name']);
        });
        return response()->json($users);
    }
}
