<?php

namespace App\Http\Controllers;

use App\Models\TeacherGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
            'project' => $TeacherGroup
        ];

        return response($response, 201);
    }
}
