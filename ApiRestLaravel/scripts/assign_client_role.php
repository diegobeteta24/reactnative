<?php

require __DIR__ . '/../vendor/autoload.php';

$app = require __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use App\Models\Role;

$email = 'admin@example.com';
$user = User::where('email', $email)->first();
if (! $user) {
    echo "User with email $email not found.\n";
    exit(1);
}

$role = Role::find('CLIENT');
if (! $role) {
    echo "Role CLIENT not found.\n";
    exit(1);
}

// detach any existing roles to avoid duplicates and ensure correct role
// but keep this idempotent: only attach if not attached
if ($user->roles()->where('roles.id', $role->id)->exists()) {
    echo "User {$user->email} already has role {$role->id}.\n";
} else {
    // replace existing roles with only CLIENT (sync ensures a single role)
    $user->roles()->sync([$role->id]);
    echo "Assigned role {$role->id} to user {$user->email}.\n";
}
