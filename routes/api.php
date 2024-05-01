<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Check authentication route
Route::middleware('auth:sanctum')->get('/check-auth', [AuthController::class, 'checkAuth']);

// Route to return user data
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route to handle resume
Route::middleware('auth:sanctum')->get('/profile', function (Request $request) {
   
    $user = $request->user();

   
    if ($user) {
        
        return response()->json(['user' => $user]);
    } else {
      
        return response()->json(['message' => 'User not found'], 404);
    }
});
