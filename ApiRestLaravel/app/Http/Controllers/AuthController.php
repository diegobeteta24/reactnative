<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'lastname' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'nullable|string|max:20',
            'image' => 'nullable|string|max:255',
            'notification_token' => 'nullable|string|max:255',
            // allow client to optionally request a role by id (e.g. CLIENT, DRIVER, ADMIN)
            'role' => 'nullable|string|exists:roles,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'image' => $request->image,
            'notification_token' => $request->notification_token,
            'is_active' => true,
        ]);

        // Attach role via pivot. If client didn't send a role, default to CLIENT.
        $roleId = $request->input('role', 'CLIENT');
        $role = Role::find($roleId);
        if (! $role) {
            // fallback to CLIENT if provided role not found
            $role = Role::find('CLIENT');
        }

        if ($role) {
            $user->roles()->attach($role->id);
        }

        // Create JWT token for the user
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $credentials = $request->only('email', 'password');

        if (! $token = JWTAuth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = JWTAuth::user();

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        // Invalidate the token
        try {
            $token = JWTAuth::getToken();
            if ($token) {
                JWTAuth::invalidate($token);
            }
        } catch (\Exception $e) {
            // ignore
        }

        return response()->json(['message' => 'Logged out']);
    }

    public function user(Request $request)
    {
        // Return authenticated user via JWT
        return response()->json(JWTAuth::user());
    }
}
