<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('testt', function () {
    return response()->json('test');
});

Route::post('/signup', [AuthController::class, 'signUp']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('test', function () {
        return response()->json('test');
    });
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::group(['middleware' => ['checkRole:teacher']], function () {
    Route::get('student', function () {
        return response()->json('test');
    });
});

Route::group(['prefix' => 'projects'], function () {
    Route::get('', [ProjectsController::class, 'get']);
    Route::post('', [ProjectsController::class, 'create']);
    Route::post('edit/{id}', [ProjectsController::class, 'edit']);
    Route::post('delete/{id}', [ProjectsController::class, 'delete']);
});

Route::group(['prefix' => 'student'], function () {
    Route::get('', [StudentGroupsController::class, 'get']);
    Route::post('create/{id}', [StudentGroupsController::class, 'create']);
});

Route::group(['prefix' => 'teacher'], function () {
    Route::get('', [TeacherGroupsController::class, 'get']);
    Route::post('create/{id}', [TeacherGroupsController::class, 'create']);
});

