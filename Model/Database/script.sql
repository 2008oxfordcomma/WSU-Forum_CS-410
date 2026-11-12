-- Primary Author: Rachal Thornton
-- Additional Contributors:
-- Date Created: 11/04/26
-- Date Last Updated: 11/11/26
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