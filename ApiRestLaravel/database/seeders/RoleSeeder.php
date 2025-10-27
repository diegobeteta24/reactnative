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
        Role::firstOrCreate(['name' => 'passenger'], ['description' => 'Usuario pasajero']);
        Role::firstOrCreate(['name' => 'driver'], ['description' => 'Usuario conductor']);
    }
}
