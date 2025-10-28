<?php

namespace App\Services;

use App\Models\User;
use App\Models\Role;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Arr;

class UserService
{
    /**
     * Register a new user and return user + token
     *
     * @param array $data
     * @return array
     */
    public function register(array $data): array
    {
        $user = User::create([
            'name' => Arr::get($data, 'name'),
            'lastname' => Arr::get($data, 'lastname'),
            'email' => Arr::get($data, 'email'),
            'password' => Arr::get($data, 'password'),
            'phone' => Arr::get($data, 'phone'),
            'image' => Arr::get($data, 'image'),
            'notification_token' => Arr::get($data, 'notification_token'),
            'is_active' => true,
        ]);

        // Attach role by id (default CLIENT)
        $roleId = Arr::get($data, 'role', 'CLIENT');
        $role = Role::find($roleId) ?: Role::find('CLIENT');
        if ($role) {
            $user->roles()->attach($role->id);
        }

        // Create JWT token
        // reload user with roles
        $user->load('roles');
        $token = JWTAuth::fromUser($user);

        return ['user' => $user, 'token' => $token];
    }

    /**
     * Attempt login with credentials and return user + token
     *
     * @param array $credentials
     * @return array|null
     */
    public function login(array $credentials): ?array
    {
        if (! $token = JWTAuth::attempt($credentials)) {
            return null;
        }

        $user = JWTAuth::user();
        $user->load('roles');

        return ['user' => $user, 'token' => $token];
    }

    /**
     * Invalidate current token
     *
     * @return void
     */
    public function logout(): void
    {
        $token = JWTAuth::getToken();
        if ($token) {
            JWTAuth::invalidate($token);
        }
    }

    /**
     * Return authenticated user from token
     *
     * @return User|null
     */
    public function me(): ?User
    {
        $user = JWTAuth::user();
        if ($user) {
            $user->load('roles');
        }
        return $user;
    }
}
