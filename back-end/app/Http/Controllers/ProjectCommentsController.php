<?php

namespace App\Http\Controllers;

use App\Models\ProjectComments;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ProjectCommentsController extends Controller
{
    public function get()
    {
        return response()->json(ProjectComments::get());
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|min:3',
            'text' => 'required|string',
            'user_id' => 'required|integer',
            'projectprogress_id' => 'required|integer'
        ]);

        // if the validator fails return 400 bad request

        if ($validator->fails()) {

            $errors = $validator->errors();

            return response()->json($errors, 400);

        }

        $ProjectComments = ProjectComments::create([
            'title' => $request['title'],
            'text' => $request['text'],
            'user_id' => $request['user_id'],
            'projectprogress_id' => $request['projectprogress_id']
        ]);

        $response = [
            'ProjectComments' => $ProjectComments
        ];

        return response($response, 201);
    }
}
