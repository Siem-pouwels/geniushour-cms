<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class ProjectsController extends Controller
{
    public function get()
    {
        return response()->json(Project::get());
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3',
            'category' => 'required|string',
            'timeSpent' => 'integer',
            'timeTotal' => 'integer',
            'summary' => 'string'
        ]);

        // if the validator fails return 400 bad request

        if ($validator->fails()) {

            $errors = $validator->errors();

            return response()->json($errors, 400);

        }

        $project = Project::create([
            'name' => $request['name'],
            'category' => $request['category'],
            'timeSpent' => $request['timeSpent'],
            'timeTotal' => $request['timeTotal'],
            'summary' => $request['summary']
        ]);

        $response = [
            'project' => $project
        ];

        return response($response, 201);
    }

    public function edit(Request $request, $id)
    {
        $check = Project::find($id);
        if ($check === null) {

            $errorMessage = [
                'message' => "Project doesn't exist."
            ];

            return response($errorMessage, 400);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3',
            'category' => 'required|string',
            'timeSpent' => 'integer',
            'timeTotal' => 'integer',
            'summary' => 'string'
        ]);

        // if the validator fails return 400 bad request

        if ($validator->fails()) {

            $errors = $validator->errors();

            return response()->json($errors, 400);

        }

        $project = Project::find($id);
        $project = $project->fill($request->all())->save();

        $response = [
            'message' => "project has been succesfully updated."
        ];

        return response($response, 201);
    }

    public function delete(Request $request, $id)
    {
        $check = Project::find($id);
        if ($check === null) {

            $errorMessage = [
                'message' => "Project doesn't exist."
            ];

            return response($errorMessage, 400);
        }

        $project = Project::find($id)->delete();
        
        $response = [
            'message' => "project has been succesfully deleted."
        ];

        return response($response, 201);
    }
}
