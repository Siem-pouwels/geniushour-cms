<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\ProjectsProgressController;
use App\Http\Controllers\GroupsController;
use App\Http\Controllers\StudentGroupsController;
use App\Http\Controllers\TeacherGroupsController;
use App\Http\Controllers\FilesController;
use App\Http\Controllers\UsersController;
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
    Route::get('/{id}', [ProjectsController::class, 'getProject']);
    Route::post('create', [ProjectsController::class, 'create']);
    Route::post('edit/{id}', [ProjectsController::class, 'edit']);
    Route::post('delete/{id}', [ProjectsController::class, 'delete']);
});

Route::group(['prefix' => 'group'], function () {
    Route::get('', [GroupsController::class, 'get']);
    Route::get('getStudent', [GroupsController::class, 'getStudent']);
    Route::get('getTeacher', [GroupsController::class, 'getTeacher']);
    Route::get('getGroups', [GroupsController::class, 'getGroups']);
    Route::post('create', [GroupsController::class, 'create']);
});

Route::group(['prefix' => 'studentgroup'], function () {
    Route::get('', [StudentGroupsController::class, 'get']);
    Route::get('/{id}', [StudentGroupsController::class, 'getById']);
    Route::post('create/{id}', [StudentGroupsController::class, 'create']);
});

Route::group(['prefix' => 'users'], function () {
    Route::get('/students', [UsersController::class, 'getStudents']);
    Route::get('/teachers', [UsersController::class, 'getTeachers']);
});

Route::group(['prefix' => 'teachergroup'], function () {
    Route::get('', [TeacherGroupsController::class, 'get']);
    Route::post('create/{id}', [TeacherGroupsController::class, 'create']);
});

Route::group(['prefix' => 'projectProgress'], function () {
    Route::get('', [ProjectsProgressController::class, 'get']);
    Route::get('/{id}', [ProjectsProgressController::class, 'getProjectProgress']);
    Route::post('create', [ProjectsProgressController::class, 'create']);
    Route::post('edit/{id}', [ProjectsProgressController::class, 'edit']);
    Route::post('delete/{id}', [ProjectsProgressController::class, 'delete']);
});


Route::group(['prefix' => 'files'], function () {
    Route::post('', [FilesController::class, 'post']);
});
