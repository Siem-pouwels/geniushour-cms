<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImagePoolsController extends Controller
{
    public function get()
    {
        return response()->json(Image::get());
    }
}
