<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\UserService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    private UserService $users;

    public function __construct(UserService $users)
    {
        $this->users = $users;
    }

    public function register(RegisterRequest $request)
    {
        // Request is already validated by RegisterRequest

        $data = array_merge($request->validated(), [
            // hash the password before delegating to the service
            'password' => Hash::make($request->password),
        ]);

        $result = $this->users->register($data);

        return response()->json($result, 201);
    }

    public function login(LoginRequest $request)
    {
        // Request is validated by LoginRequest
        $credentials = $request->only('email', 'password');

        $result = $this->users->login($credentials);
        if (! $result) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return response()->json($result);
    }

    public function logout(Request $request)
    {
        $this->users->logout();

        return response()->json(['message' => 'Logged out']);
    }

    public function user(Request $request)
    {
        // Delegate to service
        return response()->json($this->users->me());
    }
}
