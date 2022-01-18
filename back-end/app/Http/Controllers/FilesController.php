<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FilesController extends Controller
{
    public function Post(Request $request)
    {
        return response()->json($request);
    }
}
