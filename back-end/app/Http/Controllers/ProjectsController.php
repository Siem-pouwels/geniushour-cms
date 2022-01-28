<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;


class ProjectsController extends Controller
{
    public function get()
    {
        return response()->json(Project::get());
    }

    public function getProject($id)
    {
        return response()->json(Project::find($id));
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

    public function getStudentDashboard($id)
    {
        $hours = DB::table('student_hours')->where('student_hours.user_id', '=', $id)->get();
        
        $projects = DB::table('projects')
        ->join('projectprogress', 'projects.id', '=', 'projectprogress.project_id')
        ->join('groups', 'projectprogress.studentgroups_id', '=', 'groups.id')
        ->join('studentgroups', 'groups.id', '=', 'studentgroups.group_id')
        ->join('users', 'studentgroups.user_id', '=', 'users.id')
        ->where('users.id', '=', $id)
        ->get(['projects.id','projects.name','projects.category','projects.timeSpent','projects.timeTotal','projects.summary']);

        $projects = json_decode($projects, true);

        $arrayCount= 0 ;

        foreach($projects as $id => $key)
        {

            $comments = DB::table('projectcomments')
            ->join('users', 'projectcomments.user_id', '=', 'users.id')
            ->join('projectprogress', 'projectcomments.projectprogress_id', '=', 'projectprogress.id')
            ->join('projects', 'projectprogress.project_id', '=', 'projects.id')
            ->where('projects.id', '=', $key['id'])
            ->get(['projectcomments.id','projectcomments.title','projectcomments.text','users.first_name']);

            $projects[$arrayCount]["comments"] = $comments;
            $arrayCount++;
        }

        $response = [
            'project' => $projects,
            'hours' => $hours
        ];


        return response($response, 201);
    }
}
