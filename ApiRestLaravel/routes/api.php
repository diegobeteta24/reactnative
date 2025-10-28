<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes using JWT guard
Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    // Get any user by id (returns roles)
    Route::get('/users/{id}', [\App\Http\Controllers\UserController::class, 'show']);
    // Update authenticated user
    Route::match(['put','patch'],'/user', [\App\Http\Controllers\UserController::class, 'update']);
});