<?php

require __DIR__ . '/../vendor/autoload.php';

$app = require __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Role;

$old = 'driver';
$new = 'DRIVER';

$role = Role::where('id', $old)->first();
if ($role) {
    // allow mass assignment of id
    $role->id = $new;
    $role->save();
    echo "Updated id $old -> $new\n";
} else {
    echo "No role with id $old found.\n";
}
