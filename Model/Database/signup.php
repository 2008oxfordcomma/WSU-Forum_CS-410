<?php
// Author: Dre Harm
// Date: 11/11/26
// Note: Some of the stuff here was losely taken directly from the lab we did in CS485, 
// but I had to move some of the logic that was initially in js to here and added checks for the new field we have

// I'm using this as a reference for the error codes https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status

require __DIR__ . '/api.php';

requirePost();
startSession();

$data = readJsonBody();
$firstName = trim($data['firstName'] ?? '');
$lastName = trim($data['lastName'] ?? '');
$role = strtolower(trim($data['role'] ?? ''));
$email = strtolower(trim($data['email'] ?? ''));
$password = $data['password'] ?? '';
$confirmPassword = $data['confirmPassword'] ?? '';

if ($firstName === '' || $lastName === '') {
    sendError('Please enter your first and last name');
}
if (mb_strlen($firstName) > 50 || mb_strlen($lastName) > 50) {
    sendError('Names can\'t exceed 50 characters');
}

$allowedRoles = ['student' => 'Student', 'professor' => 'Professor'];
if (!isset($allowedRoles[$role])) {
    sendError('Please select if you\'re a Student or a Professor');
}

// I took the same rule Rachal had in the script.sql -> chk_email, I'm checking it here first so we can give back an actual message
// I did throw the rule I wanted into a regex converter online
if (strlen($email) > 50 || !filter_var($email, FILTER_VALIDATE_EMAIL) || !preg_match('/^[^@\s]+\.[^@\s]+@(go\.)?winona\.edu$/', $email)) {
    sendError('Please use your WSU email (first.last@go.winona.edu or first.last@winona.edu)');
}

if (strlen($password) < 8) {
    sendError('Your password needs to be at least 8 characters');
}
if ($password !== $confirmPassword) {
    sendError("The passwords don't match");
}

$hash = password_hash($password, PASSWORD_DEFAULT);

try {
    $stmt = $pdo->prepare(
        'INSERT INTO users (fname, lname, user_role, email, password) VALUES (?, ?, ?, ?, ?)'
    );
    $stmt->execute([$firstName, $lastName, $allowedRoles[$role], $email, $hash]);
} catch (PDOException $e) {
    if ($e->getCode() === '23000') {
        sendError('There is already an account with that email, try logging in instead', 409);
    }
    error_log('signup.php: ' . $e->getMessage());
    sendError('Something went wrong when creating your account, please try again', 500);
}

$userId = $pdo->lastInsertId();
logInAs($userId);

sendJson(['user' => userToJson(findUserById($pdo, $userId))], 201);
?>