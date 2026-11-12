<?php
// Author: Dre Harm
// Date: 11/11/26
// Note: This was also pretty much taken directly from the lab we did in CS485 with the excption of adding cookie to store session data
require __DIR__ . '/api.php';

requirePost();
startSession();

$_SESSION = [];
$params = session_get_cookie_params();
setcookie(session_name(), '', [
    'expires' => time() - 3600,
    'path' => $params['path'],
    'secure' => $params['secure'],
    'httponly' => $params['httponly'],
    'samesite' => $params['samesite'],
]);
session_destroy();

sendJson(['user' => null]);
?>