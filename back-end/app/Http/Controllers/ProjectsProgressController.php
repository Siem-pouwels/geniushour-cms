<?php

namespace App\Http\Controllers;

use App\Models\ProjectProgress;
use Illuminate\Http\Request;

class ProjectsProgressController extends Controller
{
    public function get()
    {
        return response()->json(ProjectProgress::get());
    }
}
