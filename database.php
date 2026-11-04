<?php  
// Primary Author:
// Contributors: Rachal Thornton
// Date Created: 11/04/26
// Date Last Updated: 11/04/26
// Description: A PHP program to establish a connection to a MySQL server.

// Will need to set up parser/composer for an expected .env file
// .env file will hold database connection information so we don't publish it to GitHub
$host = $_ENV['DB_HOST'];
$port = $_ENV['DB_PORT'];
$db = $_ENV['DB_NAME'];
$user = $_ENV['DB_USER'];
$pass = $_ENV['DB_PASSWORD'];
$charset = 'utf8mb4';

// Establish the data source name
$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";

// Try to connect to database
try {
    $pdo = new PDO($dsn, $user, $pass);
    echo "Successfully connected to DB!";
} catch (\PDOException $e) {
    echo "Failed to connect to DB: ". $e->getMessage();
}

?>