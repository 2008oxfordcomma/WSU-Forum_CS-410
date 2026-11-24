<?php 
    // Author: Dre Harm
    // Date: 11/24/26
    require __DIR__ . '/groupData.php';

    requirePost();
    startSession();

    $userId = requireLogin();
?>