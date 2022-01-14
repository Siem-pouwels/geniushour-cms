<?php

namespace App\Http\Controllers;

use App\Models\StudentGroup;
use Illuminate\Http\Request;

class StudentGroupsController extends Controller
{
    public function get()
    {
        return response()->json(StudentGroup::get());
    }
}
