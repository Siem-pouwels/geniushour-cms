<?php

namespace App\Http\Controllers;

use App\Models\TeacherGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class TeacherGroupsController extends Controller
{
    public function get()
    {
        return response()->json(TeacherGroup::get());
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'group_id' => 'required',
            'user_id' => 'required',
        ]);

        // if the validator fails return 400 bad request

        if ($validator->fails()) {

            $errors = $validator->errors();

            return response()->json($errors, 400);

        }

        $TeacherGroup = TeacherGroup::create([
            'group_id' => $request['group_id'],
            'user_id' => $request['user_id']
        ]);

        $response = [
            'TeacherGroup' => $TeacherGroup
        ];

        return response($response, 201);
    }

    public function createmore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'group_id' => 'required',
            'user_id' => 'required',
        ]);

        // if the validator fails return 400 bad request

        if ($validator->fails()) {

            $errors = $validator->errors();

            return response()->json($errors, 400);

        }

        foreach($request['user_id'] as $id => $key)
        {
            $TeacherGroup = TeacherGroup::create([

                'group_id' => $request['group_id'],

                'user_id' => $key

            ]);
        }
        
        $response = [
            'TeacherGroup' => $TeacherGroup
        ];

        return response($response, 201);
    }

    public function getUsers($id)
    {
        return response()->json(User::join('teachergroups', 'users.id', '=', 'teachergroups.user_id')
        ->join('groups', 'teachergroups.group_id', '=', 'groups.id')
        ->where('groups.id', '=', $id)->get());
    }
}
