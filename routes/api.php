<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/check-auth', [AuthController::class, 'checkAuth']);
    Route::post('/updateName/{id}', [AuthController::class, 'updateName']);
    Route::post('/updateEmail/{id}', [AuthController::class, 'updateEmail']);
    Route::post('/updateAboutMe/{id}', [AuthController::class, 'updateAboutMe']);
    Route::post('/updateLivePlace/{id}', [AuthController::class, 'updateLivePlace']);
    Route::post('/updatePhoneNumber/{id}', [AuthController::class, 'updatePhoneNumber']);
    Route::post('/updateLanguages/{id}', [AuthController::class, 'updateLanguages']);
    Route::post('/updateEducations/{id}', [AuthController::class, 'updateEducations']);
    Route::post('/updateExperiences/{id}', [AuthController::class, 'updateExperiences']);
    Route::post('/updateSkills/{id}', [AuthController::class, 'updateSkills']);
    Route::post('/updateHobbies/{id}', [AuthController::class, 'updateHobbies']);
    Route::post('/upload/{id}', [AuthController::class, 'upload']);
});
