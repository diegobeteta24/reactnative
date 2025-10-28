<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Storage;


class UserController extends Controller
{
    /**
     * Display the specified user with roles.
     */
    public function show($id)
    {
        $user = User::with('roles')->find($id);
        if (! $user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    /**
     * Update authenticated user data (name, lastname, email, phone, image).
     */
    public function update(UpdateUserRequest $request)
    {
        $user = auth()->user();
        if (! $user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $data = $request->validated();

        // Handle file upload if present
        if ($request->hasFile('profile_image_file')) {
            $file = $request->file('profile_image_file');
            $path = $file->store('public/profile_images');
            // store returns path like 'public/profile_images/xxx.jpg'
            // we want to expose via storage URL
            $publicPath = Storage::url(str_replace('public/', '', $path));
            $data['image'] = $publicPath;
        }

        // Update model
        $user->fill(array_filter($data, function ($v) { return ! is_null($v); }));
        $user->save();

        $user->load('roles');

        return response()->json($user);
    }
}
