<?php
// Author: Ethan Larosn
// Date: 11/15/26
//Note: Required for generating feed for javascript model

require __DIR__ . '/api.php';

requirePost();
startSession();


$stmt = $pdo->prepare('SELECT fname, lname, message, send_time FROM comments, users where comments.user_id = users.user_id order by send_time asc');
$stmt->execute();
$comments = $stmt->fetchAll();

sendJson($comments);
?>
