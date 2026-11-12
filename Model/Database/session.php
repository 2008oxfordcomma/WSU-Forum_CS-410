<?php
// Author: Dre Harm 
// Date: 11/11/26
// we have to tell the home page(and every other page we make) who is logged in. 
// if the way I'm thinking about this is right, the model calls this when the page loads, 
// that way refreshing the page doesn't log you out
require __DIR__ . '/api.php';

startSession();

$user = null;
if (isset($_SESSION['user_id'])) {
    $row = findUserById($pdo, $_SESSION['user_id']);
    if ($row) {
        $user = userToJson($row);
    } else { 
        // I don't see any reason why this would happen,
        // but I'm handing the session if their account was deleted while they were logged in (ex. us messing around with the db)
        $_SESSION = [];
    }
}

sendJson(['user' => $user]);
?>