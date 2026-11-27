<?php
// Author: Dre Harm
// Date: 11/26/26
// Note: To give credit where it's due, I used Benjamin's attachment.php logic here
require __DIR__ . '/api.php';
startSession();
if (empty($_SESSION['user_id'])) sendError('Please log in', 401);
session_write_close();

$stmt = $pdo->prepare('SELECT mime, contents FROM group_images WHERE group_id = ? AND kind = ?');
$stmt->execute([(int) ($_GET['group'] ?? 0), $_GET['kind'] ?? '']);
$image = $stmt->fetch();
if (!$image) sendError('No image', 404);

header('Content-Type: ' . $image['mime']);
header('X-Content-Type-Options: nosniff');
// since I'm not implenting the option for a group image to change, the browser can just keep them instead of downloading them everytime we redraw
header('Cache-Control: private, max-age=86400'); 
echo $image['contents'];
?>