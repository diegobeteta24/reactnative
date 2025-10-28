<?php

require __DIR__ . '/../vendor/autoload.php';

$app = require __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Role;

$roles = Role::all();
foreach ($roles as $r) {
    echo $r->id . " | " . $r->name . " | " . ($r->route ?? 'NULL') . " | " . ($r->image ?? 'NULL') . "\n";
}
