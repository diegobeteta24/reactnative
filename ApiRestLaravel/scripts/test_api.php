<?php

// Simple API tester using file_get_contents and stream_context
$base = 'http://127.0.0.1:8000/api';

function post($url, $data, $headers = []) {
    $opts = [
        'http' => [
            'method' => 'POST',
            'header' => array_merge(["Content-Type: application/json"], $headers),
            'content' => json_encode($data),
            'ignore_errors' => true,
        ],
    ];
    $context = stream_context_create($opts);
    $result = file_get_contents($url, false, $context);
    $code = null;
    if (isset($http_response_header)) {
        foreach ($http_response_header as $h) {
            if (preg_match('#^HTTP/.* (\d{3})#', $h, $m)) {
                $code = (int)$m[1];
                break;
            }
        }
    }
    return ['status' => $code, 'body' => $result];
}

function get($url, $headers = []) {
    $opts = [
        'http' => [
            'method' => 'GET',
            'header' => $headers,
            'ignore_errors' => true,
        ],
    ];
    $context = stream_context_create($opts);
    $result = file_get_contents($url, false, $context);
    $code = null;
    if (isset($http_response_header)) {
        foreach ($http_response_header as $h) {
            if (preg_match('#^HTTP/.* (\d{3})#', $h, $m)) {
                $code = (int)$m[1];
                break;
            }
        }
    }
    return ['status' => $code, 'body' => $result];
}

echo "Testing API endpoints on $base\n";

// use a unique email to avoid conflicts
$email = 'test+' . time() . '@example.com';
$password = 'password123';

// 1) Register
$reg = post($base . '/register', [
    'name' => 'Tester',
    'lastname' => 'User',
    'email' => $email,
    'password' => $password,
    'password_confirmation' => $password,
]);

echo "REGISTER status: {$reg['status']}\n";
echo "REGISTER body: {$reg['body']}\n\n";

// 2) Login
$login = post($base . '/login', [
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

$authHeader = ["Authorization: Bearer $token"];

// 3) GET /user
$user = get($base . '/user', $authHeader);
echo "USER status: {$user['status']}\n";
echo "USER body: {$user['body']}\n\n";

// 4) POST /logout
$logout = post($base . '/logout', [], $authHeader);
echo "LOGOUT status: {$logout['status']}\n";
echo "LOGOUT body: {$logout['body']}\n\n";

echo "Tests completed.\n";
