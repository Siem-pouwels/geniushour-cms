<?php

namespace App\Http\Controllers;

use App\Models\ProjectProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

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
            'teachergroups_id' => 'required|int',
            'studentgroups_id' => 'required|int',
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
            'teachergroups_id' => $request['teachergroups_id'],
            'studentgroups_id' => $request['studentgroups_id'],
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
            'teachergroups_id' => 'required|int',
            'studentgroups_id' => 'required|int',
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

    public function overvieuw()
    {
        $projectProgress = DB::table('projectProgress')
        ->get(['projectProgress.id', 'projectProgress.amountofhours', 'projectProgress.title', 'projectProgress.description','projectProgress.project_id','projectProgress.teachergroups_id','projectProgress.studentgroups_id','projectProgress.created_at']);

        $projectProgress = json_decode($projectProgress, true);

        $arrayCount=0;

        foreach ($projectProgress as $id => $key) {

            $teacher = DB::table('users')
            ->join('teachergroups', 'users.id', '=', 'teachergroups.user_id')
            ->join('groups', 'teachergroups.group_id', '=', 'groups.id')
            ->join('projectProgress', 'groups.id', '=', 'projectProgress.teachergroups_id')
            ->where('projectProgress.id', '=', $key['id'])
            ->get(['users.id', 'users.first_name', 'users.addition', 'users.surname', 'users.student_number']);

            $student = DB::table('users')
            ->join('studentgroups', 'users.id', '=', 'studentgroups.user_id')
            ->join('groups', 'studentgroups.group_id', '=', 'groups.id')
            ->join('projectProgress', 'groups.id', '=', 'projectProgress.studentgroups_id')
            ->where('projectProgress.id', '=', $key['id'])
            ->get(['users.id', 'users.first_name', 'users.addition', 'users.surname', 'users.student_number']);

            $theProject = DB::table('projects')
            ->join('projectProgress', 'projects.id', '=', 'projectProgress.project_id')
            ->where('projectProgress.id', '=', $key['id'])
            ->get(['projects.id', 'projects.name', 'projects.category', 'projects.timeTotal', 'projects.summary','projects.created_at']);

            $projectProgress[$arrayCount]["teachers"] = $teacher;
            $projectProgress[$arrayCount]["students"] = $student;
            $projectProgress[$arrayCount]["projects"] = $theProject;
            $arrayCount++;
        }

        $response = [
            'projectProgress' => $projectProgress
        ];


        return response($response, 201);

    }

    public function editInfo(Request $request)
    {

    }
}
