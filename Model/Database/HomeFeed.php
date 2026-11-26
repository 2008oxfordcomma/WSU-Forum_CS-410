<?php
// Author: Ethan Larosn
// Date: 11/15/26
//Note: Required for generating feed for javascript model

require __DIR__ . '/api.php';

requirePost();
startSession();


if (empty($_SESSION['user_id'])) sendError('Please log in.', 401);
$stmt = $pdo->prepare('SELECT c.post_id, u.fname, u.lname, u.major, c.message, c.send_time, a.filename, a.mime
    FROM posts c JOIN users u ON c.user_id = u.user_id
    LEFT JOIN dashboard_post_attachments a ON a.post_id = c.post_id
    ORDER BY c.send_time DESC, c.post_id DESC');
$stmt->execute();
$posts = $stmt->fetchAll();

sendJson($posts);
?>
