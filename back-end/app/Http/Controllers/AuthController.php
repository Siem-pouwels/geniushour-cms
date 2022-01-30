<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function signUp(Request $request)
    {
        $fields = $request->validate([
            'first_name' => 'required|string',
            'surname' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed|min:6',
            'password_confirmation' => 'required| min:6'
        ]);

        $user = User::create([
            'first_name' => $fields['first_name'],
            'surname' => $fields['surname'],
            'email' => $fields['email'],
            'role' => 'student',
            'password' => bcrypt($fields['password'])
        ]);

        $token = $user->createToken('accestoken', ['role:student'])->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Bad credentials'
            ], 401);
        }

        $token = $user->createToken('myapptoken', ['role:' . $user->role])->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function logout()
    {
        Auth::user()->tokens->each(function ($token, $key) {
            $token->delete();
        });

        return [
            'message' => 'Logged out'
        ];
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required|string|confirmed|min:6',
            'password_confirmation' => 'required| min:6'
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json($errors, 400);
        }

        $id = auth('sanctum')->user()->id;
        $user = User::find($id);
        $user->password = bcrypt($request->password);
        $user->save();
        $response = [
            'message' => "Succesfully changed the password",
        ];
        return response()->json($response);
    }
}
