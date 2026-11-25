<?php 
    // Author: Dre Harm
    // Date: 11/24/26
    require __DIR__ . '/groupData.php';
    
    startSession();

    $userId = requireLogin();
    sendJson(['groups' => fetchGroups($pdo, $userId)]);
?>