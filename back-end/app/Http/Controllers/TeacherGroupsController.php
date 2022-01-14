<?php

namespace App\Http\Controllers;

use App\Models\TeacherGroup;
use Illuminate\Http\Request;

class TeacherGroupsController extends Controller
{
    public function get()
    {
        return response()->json(TeacherGroup::get());
    }

    public function create(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3',
            'type' => 'required|string',
            $id => 'integer'
        ]);

        // if the validator fails return 400 bad request

        if ($validator->fails()) {

            $errors = $validator->errors();

            return response()->json($errors, 400);

        }

        $Teachergroup = TeacherGroup::create([
            'name' => $request['name'],
            'type' => $request['type'],
            'user_id' => $id
        ]);

        $response = [
            'project' => $Teachergroup
        ];

        return response($response, 201);
    }
}
