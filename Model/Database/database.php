<?php
// Primary Author:
// Contributors: Rachal Thornton, Dre Harm
// Date Created: 11/04/26
// Date Last Updated: 11/11/26
// Description: A PHP program to establish a connection to a MySQL server.

// I was watching a video on how to set this up and the .env file is supposed to 
// sit in the folder above our site that way Apache can't send it to the browser - Dre
$envPath = __DIR__ . '/../../../.env';

// I just changed ENV to env so the file name is consistent - Dre
$env = parse_ini_file($envPath, false, INI_SCANNER_RAW);

$host = $env['DB_HOST'];
$port = $env['DB_PORT'];
$db = $env['DB_NAME'];
$user = $env['DB_USER'];
$pass = $env['DB_PASSWORD'];
$charset = 'utf8mb4';

// Establish the data source name
$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";

// Try to connect to database
try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, 
        PDO::ATTR_EMULATE_PREPARES => false,              
    ]);
} catch (\PDOException $e) { 
    error_log('Failed to connect to DB: '. $e->getMessage());
    exit;
}
?>