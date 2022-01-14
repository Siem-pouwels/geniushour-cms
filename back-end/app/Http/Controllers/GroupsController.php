<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GroupsController extends Controller
{
    public function create(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3',
            'type' => 'required|string',
        ]);

        // if the validator fails return 400 bad request

        if ($validator->fails()) {

            $errors = $validator->errors();

            return response()->json($errors, 400);

        }

        $Studentgroup = StudentGroup::create([
            'name' => $request['name'],
            'type' => $request['type']
        ]);

        $response = [
            'project' => $Studentgroup
        ];

        return response($response, 201);
    }
}
