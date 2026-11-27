<?php
// Author: Benjamin Nguyen
require __DIR__ . '/api.php';
requirePost();
startSession();
if (empty($_SESSION['user_id'])) sendError('Please log in to post.', 401);

$message = $_POST['message'] ?? '';
if (!is_string($message) || !mb_check_encoding($message, 'UTF-8')) sendError('Invalid post text.');
$message = trim($message);
$words = preg_match_all('/[^\s\x{FEFF}]+/u', $message);
if ($words > 500 || strlen($message) > 100000) sendError('Use up to 500 words and 100 KB of text.');

$file = $_FILES['attachment'] ?? null;
$attached = $file && $file['error'] !== UPLOAD_ERR_NO_FILE;
if (!$words && !$attached) sendError('Write a post or select an attachment.');
if ($attached) {
    if ($file['error'] !== UPLOAD_ERR_OK || $file['size'] > 10485760 || !$file['size']) {
        sendError('Choose a nonempty file up to 10 MB.');
    }
    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
    if (!in_array($mime, ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'application/pdf', 'text/plain'], true)) {
        sendError('Select a PNG, JPEG, GIF, WebP, PDF, or plain text file.');
    }
    $filename = mb_substr(basename($file['name']), 0, 255);
    $bytes = file_get_contents($file['tmp_name']);
    if ($bytes === false) sendError('Could not read the attachment.');
}
try {
    $pdo->beginTransaction();
    $groupId = $pdo->query("SELECT MIN(group_id) FROM `groups` WHERE group_name = 'General'")->fetchColumn();
    if (!$groupId) throw new RuntimeException('Dashboard group missing. Run posting.sql.');
    $stmt = $pdo->prepare('INSERT INTO posts(user_id, group_id, message, send_time) VALUES (?, ?, ?, CURRENT_TIMESTAMP)');
    $stmt->execute([$_SESSION['user_id'], $groupId, $message]);
    $id = $pdo->lastInsertId();
    if ($attached) {
        $stmt = $pdo->prepare('INSERT INTO dashboard_post_attachments(post_id, filename, mime, contents) VALUES (?, ?, ?, ?)');
        $stmt->execute([$id, $filename, $mime, $bytes]);
    }
    $stmt = $pdo->prepare('SELECT c.post_id, c.message, c.send_time, u.fname, u.lname, u.major FROM posts c JOIN users u ON u.user_id = c.user_id WHERE c.post_id = ?');
    $stmt->execute([$id]);
    $post = $stmt->fetch();
    $post['filename'] = $filename ?? null;
    $post['mime'] = $mime ?? null;
    $pdo->commit();
    sendJson($post, 201);
} catch (Throwable $error) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    error_log($error->getMessage());
    sendError('Could not save the post. Please try again.', 500);
}
