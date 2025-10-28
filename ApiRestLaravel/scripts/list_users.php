<?php

require __DIR__ . '/../vendor/autoload.php';

$app = require __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;

$users = User::all();
foreach ($users as $u) {
    $roles = $u->roles->pluck('id')->join(', ');
    echo $u->id . ' | ' . $u->email . ' | Roles: ' . ($roles ?: 'NONE') . PHP_EOL;
}
