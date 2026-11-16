-- Primary Author: Rachal Thornton
-- Additional Contributors: Ethan Larson
-- Date Created: 11/04/26
-- Date Last Updated: 11/15/26
-- Description: A SQL script for the WarriorChat web-application.

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS warrior_chat_db;

-- Use specified database
USE warrior_chat_db;

-- TODO: Create tables

-- Users table
-- ? Will need to decide if/how we are hashing passwords
CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    user_role ENUM('Student', 'Professor', 'Admin') NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,

    -- Check if email is in expected formatting
    CONSTRAINT chk_email CHECK (
        email LIKE '_%._%@go.winona.edu'    
        OR email LIKE '_%._%@winona.edu'    
    )
);

-- Comment table
CREATE TABLE IF NOT EXISTS comments (
    user_id INT NOT NULL,
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    message VARCHAR(2000) NOT NULL,
    send_time TIMESTAMP NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);


