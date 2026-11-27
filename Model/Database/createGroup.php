<?php 
    // Author: Dre Harm
    // Date: 11/24/26
    require __DIR__ . '/groupData.php';

    requirePost();
    startSession();

    $userId = requireLogin();

    // i had to use FormData instead of JSON since it can have files
    $name = trim($_POST['name'] ?? '');
    $type = $_POST['type'] ?? '';
    $icon = readImage('icon');
    $banner = readImage('banner');

    // the form checks these too, but technically anyone can send requests straight to this file
    if ($name === '') sendError('The group must have a name');
    if (!in_array($type, GROUP_TYPES, true)) sendError('The group must have a type');

    // two groups with the same name would be confusing on the Groups page
    $stmt = $pdo->prepare('SELECT 1 FROM `groups` WHERE LOWER(group_name) = LOWER(?)');
    $stmt->execute([$name]);
    if ($stmt->fetch()) sendError('A duplicate group name already exists', 409);

    try {
        // I don't know if it was a problem with my sever being slow or what, but I needed to enforce 
        // that either both inserts happen, or neither does, since I was ending up with a group that has no creator in it
        $pdo->beginTransaction();
        $stmt = $pdo->prepare('INSERT INTO `groups` (group_name, group_type) VALUES (?, ?)');
        $stmt->execute([$name, $type]);
        $groupId = (int) $pdo->lastInsertId();

        $stmt = $pdo->prepare('INSERT INTO user_groups (user_id, group_id) VALUES (?, ?)');
        $stmt->execute([$userId, $groupId]);

        $stmt = $pdo->prepare('INSERT INTO group_images (group_id, kind, mime, contents) VALUES (?, ?, ?, ?)');
        if ($icon) $stmt->execute([$groupId, 'icon', $icon['mime'], $icon['contents']]);
        if ($banner) $stmt->execute([$groupId, 'banner', $banner['mime'], $banner['contents']]);
        $pdo->commit();
    } catch (PDOException $e) {
        error_log('createGroup.php: ' . $e->getMessage());
        sendError('Couldn\'t create the group, please try again', 500);
    }

    sendJson(['groupId' => $groupId], 201);
?>