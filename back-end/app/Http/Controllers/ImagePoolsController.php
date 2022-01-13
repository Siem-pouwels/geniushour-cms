<?php

namespace App\Http\Controllers;

use App\Models\ImagePool;
use Illuminate\Http\Request;

class ImagePoolsController extends Controller
{
    public function get()
    {
        return response()->json(ImagePool::get());
    }
}
