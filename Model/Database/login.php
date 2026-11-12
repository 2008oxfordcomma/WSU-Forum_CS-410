<?php
// Author: Dre Harm
// Date: 11/11/26
// Note: This was pretty much taken directly from the lab we did in CS485
require __DIR__ . '/api.php';

requirePost();
startSession();

$data = readJsonBody();
$email = strtolower(trim($data['email'] ?? ''));
$password = $data['password'] ?? '';

if ($email === '' || $password === '') {
    sendError('Please enter your email and password.');
}

// Malcom brought it up in class but when arguing with Prof. Zhang, but the ? keeps whatever a user typed from being an SQL injection
$stmt = $pdo->prepare('SELECT user_id, fname, lname, user_role, email, password FROM users WHERE email = ?');
$stmt->execute([$email]);
$row = $stmt->fetch();

// Same message whether the email doesn't exist or the password is wrong, so nobody can use this form to find out which emails have accounts
if (!$row || !password_verify($password, $row['password'])) {
    sendError('Wrong email or password.', 401);
}

logInAs($row['user_id']);

sendJson(['user' => userToJson($row)]);
?>