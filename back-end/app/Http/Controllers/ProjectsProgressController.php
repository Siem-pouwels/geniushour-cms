<?php

namespace App\Http\Controllers;

use App\Models\ProjectProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectsProgressController extends Controller
{
    public function get()
    {
        return response()->json(ProjectProgress::get());
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'finished' => 'required|string',
            'amountofhours' => 'required|string',
            'title' => 'required|string',
            'description' => 'required|string'
        ]);

        // if the validator fails return 400 bad request

        if ($validator->fails()) {

            $errors = $validator->errors();

            return response()->json($errors, 400);

        }

        $Group = ProjectProgress::create([
            'finished' => $request['finished'],
            'amountofhours' => $request['amountofhours'],
            'title' => $request['title'],
            'description' => $request['description']
        ]);

        $response = [
            'project' => $Group
        ];

        return response($response, 201);
    }

}
