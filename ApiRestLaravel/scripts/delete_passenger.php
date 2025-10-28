<?php

require __DIR__ . '/../vendor/autoload.php';

$app = require __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Role;

$deleted = Role::where('id', 'passenger')->delete();
if ($deleted) {
    echo "Deleted passenger role\n";
} else {
    echo "No passenger role found\n";
}
