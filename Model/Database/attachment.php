<?php
require __DIR__ . '/api.php';
startSession();
if (empty($_SESSION['user_id'])) sendError('Please log in.', 401);
session_write_close();
$stmt = $pdo->prepare('SELECT filename, mime, contents FROM dashboard_post_attachments WHERE post_id = ?');
$stmt->execute([(int) ($_GET['post'] ?? 0)]);
$file = $stmt->fetch();
if (!$file) sendError('Attachment unavailable.', 404);
$disposition = strncmp($file['mime'], 'image/', 6) === 0 ? 'inline' : 'attachment';
header('Content-Type: ' . $file['mime']);
header('X-Content-Type-Options: nosniff');
header('Cache-Control: private, no-store');
header("Content-Disposition: " . $disposition . "; filename*=UTF-8''" . rawurlencode($file['filename']));
echo $file['contents'];
