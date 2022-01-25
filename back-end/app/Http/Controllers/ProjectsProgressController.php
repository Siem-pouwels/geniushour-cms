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

    public function getProjectProgress($id)
    {
        return response()->json(ProjectProgress::find($id));
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'finished' => 'required|int',
            'amountofhours' => 'required|int',
            'title' => 'required|string',
            'description' => 'required|string',
            'teachergroup_id' => 'required|int',
            'studentgroup_id' => 'required|int',
            'project_id' => 'required|int'
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
            'description' => $request['description'],
            'teachergroup_id' => $request['teachergroup_id'],
            'studentgroup_id' => $request['studentgroup_id'],
            'project_id' => $request['project_id']
        ]);

        $response = [
            'project' => $Group
        ];

        return response($response, 201);
    }

    public function edit(Request $request, $id)
    {
        $check = ProjectProgress::find($id);
        if ($check === null) {

            $errorMessage = [
                'message' => "Project doesn't exist."
            ];

            return response($errorMessage, 400);
        }

        $validator = Validator::make($request->all(), [
            'finished' => 'required|string',
            'amountofhours' => 'required|string',
            'title' => 'required|string',
            'description' => 'required|string',
            'teachergroup_id' => 'required|int',
            'studentgroup_id' => 'required|int',
            'project_id' => 'required|int'
            
        ]);

        // if the validator fails return 400 bad request

        if ($validator->fails()) {

            $errors = $validator->errors();

            return response()->json($errors, 400);

        }

        $projectProgress = ProjectProgress::find($id);
        $projectProgress = $projectProgress->fill($request->all())->save();

        $response = [
            'message' => "progress has been succesfully updated."
        ];

        return response($response, 201);
    }

    public function delete(Request $request, $id)
    {
        $check = ProjectProgress::find($id);
        if ($check === null) {

            $errorMessage = [
                'message' => "Project doesn't exist."
            ];

            return response($errorMessage, 400);
        }

        $projectProgress = ProjectProgress::find($id)->delete();

        $response = [
            'message' => "project has been succesfully deleted."
        ];

        return response($response, 201);
    }
}
