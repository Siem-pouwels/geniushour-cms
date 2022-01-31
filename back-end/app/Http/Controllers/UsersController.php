<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\LoginDetailsNotification;
use App\Models\StudentHour;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use function PHPUnit\Framework\isNull;

class UsersController extends Controller
{
    public function allUsers()
    {
        return response()->json(User::select(array('id', 'student_number', 'first_name', 'addition', 'surname', 'role', 'email', 'created_at'))->get());
    }
    public function get()
    {
        return response()->json(User::get());
    }

    public function getById($id)
    {
        return response()->json(User::find($id));
    }

    public function create(Request $request)
    {
        $validator = User::make($request->all(), [
            'first_name' => 'required|string|min:3',
            'addition' => 'string',
            'surname' => 'required|string',
            'role' => 'string',
            'email' => 'string',
        ]);

        // if the validator fails return 400 bad request

        if ($validator->fails()) {

            $errors = $validator->errors();

            return response()->json($errors, 400);
        }

        $project = User::create([
            'first_name' => $request['first_name'],
            'addition' => $request['addition'],
            'surname' => $request['surname'],
            'role' => $request['role'],
            'email' => $request['email']
        ]);

        $response = [
            'user' => $project
        ];

        return response($response, 201);
    }

    public function edit(Request $request, $id)
    {
        $check = User::find($id);
        if ($check === null) {

            $errorMessage = [
                'message' => "User doesn't exist."
            ];

            return response($errorMessage, 400);
        }

        $validator = User::make($request->all(), [
            'first_name' => 'required|string|min:3',
            'surname' => 'required|string',
            'role' => 'string',
            'email' => 'string',
        ]);

        // if the validator fails return 400 bad request

        if ($validator->fails()) {

            $errors = $validator->errors();

            return response()->json($errors, 400);
        }

        $project = User::find($id);
        $project = $project->fill($request->all())->save();

        $response = [
            'message' => "user has been succesfully updated."
        ];

        return response($response, 201);
    }

    public function delete(Request $request, $id)
    {
        $check = User::find($id);
        if ($check === null) {

            $errorMessage = [
                'message' => "User doesn't exist."
            ];

            return response($errorMessage, 400);
        }

        $project = User::find($id)->delete();

        $response = [
            'message' => "User has been succesfully deleted."
        ];

        return response($response, 201);
    }

    public function getStudents()
    {
        return response()->json(User::where('role', '=', 'student')->get());
    }


    public function getTeachers()
    {
        return response()->json(User::where('role', '=', 'teacher')->get());
    }

    public function getDropdownStudents()
    {
        $users = User::where('role', '=', 'student')->get();
        $users->each(function ($model) {
            $model->setAppends(['full_name']);
        });
        return response()->json($users);
    }

    public function getDropdownTeachers()
    {
        $users = User::where('role', '=', 'teacher')->get();
        $users->each(function ($model) {
            $model->setAppends(['full_name']);
        });
        return response()->json($users);
    }

    public function InsertMultiple(Request $request)
    {
        $totalAdded = 0;
        $users = $request->all();

        foreach ($users as $user => $key) {
            if (!isNull($key[0]) || !empty($key[0])) {
                $checkUser = User::where('email', '=', $key[4])->get();

                if ($checkUser->count() == 0) {
                    $usr = User::create([
                        'student_number' => $key[0],
                        'first_name' => $key[3],
                        'surname' => $key[1],
                        'addition' => $key[2],
                        'email' => $key[4],
                        'role' => 'student',
                        'password' => Hash::make(Str::random(12))
                    ]);

                    $studentHour = StudentHour::create([
                        'user_id' => $usr->id,
                        'hours' => 0
                    ]);
                    $totalAdded++;
                    // $usr->notify(new LoginDetailsNotification($usr));
                }
            }
        }

        $response = [
            'message' => "Succesfully added (" . $totalAdded . ") users",
        ];

        return response($response, 201);
    }
}
