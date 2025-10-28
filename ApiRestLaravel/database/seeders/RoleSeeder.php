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
        // Create roles using string ids to match the diagram
        Role::updateOrCreate(['id' => 'passenger'], ['name' => 'Passenger', 'image' => null, 'route' => 'passenger']);
        Role::updateOrCreate(['id' => 'driver'], ['name' => 'Driver', 'image' => null, 'route' => 'driver']);
    }
}
