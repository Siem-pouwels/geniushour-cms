<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Group;
use App\Models\TeacherGroup;
use App\Models\StudentGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class GroupsController extends Controller
{
    // public function getUser()
    // {
    //     return User::where('id', '=', '1')->get();
    // }

    // public function getStudentGroup()
    // {
    //     return StudentGroup::where('user_id', '=', '1')->get();
    // }

    // public function getTeacherGroup()
    // {
    //     return TeacherGroup::where('user_id', '=', '1')->get();
    // }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:5',
            'type' => 'required|string',
        ]);

        // if the validator fails return 400 bad request

        if ($validator->fails()) {

            $errors = $validator->errors();

            return response()->json($errors, 400);

        }

        $Group = Group::create([
            'name' => $request['name'],
            'type' => $request['type']
        ]);

        $response = [
            'project' => $Group
        ];

        return response($response, 201);
    }

    public function getStudent()
    {
        $response = DB::table('users')
        ->join('studentGroups', 'users.id', '=', 'studentGroups.user_id')
        ->join('groups', 'studentGroups.group_id', '=', 'groups.id')
        ->where('users.id', '=', 1)->where('groups.id', '=', 1)
        ->get();

        return response($response, 201);
    }

    public function getTeacher()
    {
        $response = DB::table('users')
        ->join('TeacherGroups', 'users.id', '=', 'TeacherGroups.user_id')
        ->join('groups', 'TeacherGroups.group_id', '=', 'groups.id')
        ->where('users.id', '=', 1)->where('groups.id', '=', 1)
        ->get();

        return response($response, 201);
    }

    public function getGroups()
    {
        $response = Group::get();

        return response($response, 201);
    }
}
