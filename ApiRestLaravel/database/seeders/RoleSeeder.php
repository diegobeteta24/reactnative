<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles using string ids exactly as in the provided image
        Role::updateOrCreate(['id' => 'ADMIN'], [
            'name' => 'Admin',
            'image' => 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
            'route' => 'admin/home',
        ]);

        Role::updateOrCreate(['id' => 'CLIENT'], [
            'name' => 'Cliente',
            'image' => 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
            'route' => 'client/home',
        ]);

        Role::updateOrCreate(['id' => 'DRIVER'], [
            'name' => 'Conductor',
            'image' => 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
            'route' => 'driver/home',
        ]);
    }
}
