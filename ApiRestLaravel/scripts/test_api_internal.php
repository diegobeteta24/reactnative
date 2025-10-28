<?php

require __DIR__ . '/../vendor/autoload.php';

$app = require __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

use Illuminate\Http\Request;

echo "Running internal API tests (no external server)...\n";

$base = '/api';

function callKernel($kernel, $method, $uri, $data = [], $headers = []) {
    $content = $data ? json_encode($data) : null;
    $request = Request::create($uri, $method, [], [], [], [], $content);
    // Ensure API expects JSON responses
    $request->headers->set('Accept', 'application/json');
    if ($data) {
        $request->headers->set('Content-Type', 'application/json');
    }
    foreach ($headers as $k => $v) {
        // support both 'Authorization' and server keys
        $request->headers->set($k, $v);
    }
    $response = $kernel->handle($request);
    $status = $response->getStatusCode();
    $body = $response->getContent();
    return ['status' => $status, 'body' => $body];
}

$email = 'internal+' . time() . '@example.com';
$password = 'password123';

// Register
$reg = callKernel($kernel, 'POST', $base . '/register', [
    'name' => 'Internal',
    'lastname' => 'Tester',
    'email' => $email,
    'password' => $password,
    'password_confirmation' => $password,
]);

echo "REGISTER status: {$reg['status']}\n";
echo "REGISTER body: {$reg['body']}\n\n";

// Login
$login = callKernel($kernel, 'POST', $base . '/login', [
    'email' => $email,
    'password' => $password,
]);

echo "LOGIN status: {$login['status']}\n";
echo "LOGIN body: {$login['body']}\n\n";

$token = null;
if ($login['body']) {
    $j = json_decode($login['body'], true);
    if (isset($j['token'])) {
        $token = $j['token'];
    }
}

if (! $token) {
    echo "No token received, aborting further tests.\n";
    exit(1);
}

$authHeaders = ['Authorization' => 'Bearer ' . $token];

// Get user
$user = callKernel($kernel, 'GET', $base . '/user', [], $authHeaders);
echo "USER status: {$user['status']}\n";
echo "USER body: {$user['body']}\n\n";

// Logout
$logout = callKernel($kernel, 'POST', $base . '/logout', [], $authHeaders);
echo "LOGOUT status: {$logout['status']}\n";
echo "LOGOUT body: {$logout['body']}\n\n";

// Get user by id (should include roles)
// extract id from register response
$regData = json_decode($reg['body'], true);
$userId = $regData['user']['id'] ?? null;
if ($userId) {
    $userById = callKernel($kernel, 'GET', $base . '/users/' . $userId, [], $authHeaders);
    echo "USER BY ID status: {$userById['status']}\n";
    echo "USER BY ID body: {$userById['body']}\n\n";
} else {
    echo "Could not extract user id from register response, skipping users/{id} test.\n";
}

echo "Internal tests completed.\n";
