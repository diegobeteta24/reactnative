<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'Admin User',
            'lastname' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password123'),
            'phone' => '+1234567890',
            'image' => null,
            'notification_token' => null,
            'is_active' => true,
        ]);

        // Attach by role id (string)
        $role = Role::find('passenger');
        if ($role) {
            $user->roles()->attach($role->id);
        }
    }
}
