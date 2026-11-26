<?php
// Author: Dre Harm
// Date: 11/11/26
// I wanted to extract some things into reusable methods so we can call them whenever we need, 
// also kinda stemmed from Iyengar saying we should use an in-between layer between the database and model

require __DIR__ . '/database.php'; // gives us the database php object we need ($pdo)

// this'll be how the server remembers who's logged in between requests.
// TODO: look into the browser getting a random session id in a cookie, so the user's info stays on the server.
function startSession() {
    $isHttps = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
    session_set_cookie_params([
        'path' => '/',
        'secure' => $isHttps,
        'httponly' => true,    
        'samesite' => 'Lax',   
    ]);
    session_start();
}

// send $data back as JSON alongside the HTTP status code (200 means ok)
function sendJson($data, $status = 200) {
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

// sends back an error to the model and it can then be shown under the either form
function sendError($message, $status = 400) {
    sendJson(['error' => $message], $status);
}

// I talked to Zhang about this, but GET should only be able to read things and anything that changes something should be sent as a POST
// Our database book talks about cross site requests and the way to combat that is through requiring POST
function requirePost() {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        header('Allow: POST');
        sendError('This only accepts POST requests.', 405);
    }
}

function readJsonBody() {
    $data = json_decode(file_get_contents('php://input'), true);
    return is_array($data) ? $data : [];
}

// we have to convert the user table into a json which is what our js model is expecting
function userToJson($row) {
    return [
        'id' => (int) $row['user_id'],
        'firstName' => $row['fname'],
        'lastName' => $row['lname'],
        'role' => $row['user_role'],
        'email' => $row['email'],
        'major' => $row['major'],
    ];
}

// looks up a user by id in the database, should return the row or null a null
function findUserById($pdo, $userId) {
    $stmt = $pdo->prepare('SELECT user_id, fname, lname, user_role, email, major FROM users WHERE user_id = ?');
    $stmt->execute([$userId]);
    $row = $stmt->fetch();
    return $row ?: null;
}

// we need a way to keep track of the current users session so we can do that with userId.
function logInAs($userId) {
    session_regenerate_id(true);
    $_SESSION['user_id'] = (int) $userId;
}
?>
