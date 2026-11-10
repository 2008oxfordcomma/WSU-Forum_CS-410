-- Primary Author: 
-- Additional Contributors: Rachal Thornton
-- Date Created: 11/04/26
-- Date Last Updated: 11/04/26
-- Description: A SQL script for the WarriorChat web-application.


-- Create database if not exists
CREATE DATABASE IF NOT EXISTS warrior_chat_db;

-- Use specified database
USE warrior_chat_db;

-- TODO: Create tables

-- Users table
-- Will need to decide if/how we are hashing passwords
-- Will need to decide how to support different roles (Student, Professor, Admin)
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTOINCREMENT,
    fname VARCHAR(30),
    lname VARCHAR(30),
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL

    -- Check if email is in expected format
    -- Making sure email has at least 1 character,
    -- followed by either a student or employee email domain
    CONSTRAINT chk_email CHECK (
        email LIKE '_%._%@go.winona.edu'    -- Student email domain
        OR email LIKE '_%._%@winona.edu'    -- Employee email domain
    )
);