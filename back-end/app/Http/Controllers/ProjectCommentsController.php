<?php

namespace App\Http\Controllers;

use App\Models\ProjectComments;
use Illuminate\Http\Request;

class ProjectCommentsController extends Controller
{
    public function get()
    {
        return response()->json(ProjectComments::get());
    }
}
