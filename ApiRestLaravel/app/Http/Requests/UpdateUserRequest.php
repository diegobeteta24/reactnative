<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'nullable|string|max:255',
            'lastname' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:users,email,' . $this->user()->id,
            'phone' => 'nullable|string|max:20',
            'image' => 'nullable|string|max:1000', // allow URL or path
            'profile_image_file' => 'nullable|file|image|max:5120', // optional file upload
        ];
    }
}
