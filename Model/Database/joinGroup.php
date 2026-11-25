<?php 
    // Author: Dre Harm
    // Date: 11/24/26
    require __DIR__ . '/groupData.php';
    
    requirePost();
    startSession();
    $userId = requireLogin();

    $data = readJsonBody();
    $groupId = (int) ($data['groupId'] ?? 0);

    $stmt = $pdo->prepare('INSERT IGNORE INTO user_groups (user_id, group_id) VALUES (?, ?)');
    $stmt->execute([$userId, $groupId]);

    sendJson(['joined' => true]);
?>