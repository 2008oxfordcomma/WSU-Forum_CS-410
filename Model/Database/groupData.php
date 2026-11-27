<?php
    // Author: Dre Harm
    // Date: 11/24/26

    require_once __DIR__ . '/api.php';
    // pulled these from Benjamin's mockup, might be a good idea to outsource these to a config file, so, like Iyengar said, it could be easily changed if given to another institution
    const GROUP_TYPES = ['Academic', 'Campus Life', 'Organizations', 'Housing', 'Lifestyle', 'Sports'];

    function requireLogin() {
        if (empty($_SESSION['user_id'])) sendError('Please log in', 401);
        return (int) $_SESSION['user_id'];
    }

    // repurposed Benjamin's createPost attachment handling
    function readImage($field) {
        $file = $_FILES[$field] ?? null;
        if (!$file || $file['error'] === UPLOAD_ERR_NO_FILE) return null;
        if ($file['error'] !== UPLOAD_ERR_OK || $file['size'] > 10485760 || !$file['size']) sendError('Images must be 10 MB or smaller');
        $mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
        if (!in_array($mime, ['image/png', 'image/jpeg', 'image/gif', 'image/webp'], true)) sendError('Images must be PNG, JPEG, GIF, or WebP');
        return ['mime' => $mime, 'contents' => file_get_contents($file['tmp_name'])];
    }

    function fetchGroups($pdo, $userId, $groupId = null) {
        // AI disclosure: for this sql statement, I couldn't figure out how to query what I wanted, so I did ask google and used the AI overview - Dre
        $sql = 'SELECT g.group_id, g.group_name, g.group_type,
               (SELECT COUNT(*) FROM user_groups m WHERE m.group_id = g.group_id) AS member_count,
                EXISTS(SELECT 1 FROM user_groups m WHERE m.group_id = g.group_id AND m.user_id = ?) AS joined,
                EXISTS(SELECT 1 FROM group_images i WHERE i.group_id = g.group_id AND i.kind = \'icon\') AS has_icon,
                EXISTS(SELECT 1 FROM group_images i WHERE i.group_id = g.group_id AND i.kind = \'banner\') AS has_banner
                FROM `groups` g
                WHERE g.group_type IS NOT NULL
                ORDER BY g.group_id DESC';

        $stmt = $pdo->prepare($sql);
        $stmt->execute([$userId]);

        $groups = [];
        foreach ($stmt->fetchAll() as $row) {
            $groups[] = [
                'id' => (int) $row['group_id'],
                'name' => $row['group_name'],
                'type' => $row['group_type'],
                'memberCount' => (int) $row['member_count'],
                'joined' => (bool) $row['joined'],
                'hasIcon' => (bool) $row['has_icon'],
                'hasBanner' => (bool) $row['has_banner'],
            ];
        }
        return $groups;
    }
?>