-- Primary Author: Rachal Thornton
-- Additional Contributors: Ethan Larson
-- Date Created: 11/04/26
-- Date Last Updated: 11/15/26
-- Description: A SQL script for the WarriorChat web-application.

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS warrior_chat_db;

-- Use specified database
USE warrior_chat_db;

-- Users table
CREATE TABLE IF NOT EXISTS `users` (
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

-- Groups table
CREATE TABLE IF NOT EXISTS `groups` (
    group_id INT PRIMARY KEY AUTO_INCREMENT,
    group_name VARCHAR(50) NOT NULL
);

-- Posts table
CREATE TABLE IF NOT EXISTS `posts` (
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    group_id INT NOT NULL,
    message VARCHAR(2000) NOT NULL,
    send_time TIMESTAMP NOT NULL,
    
    FOREIGN KEY(user_id) REFERENCES `users`(user_id),
    FOREIGN KEY(group_id) REFERENCES `groups`(group_id)
);

-- Comment table
CREATE TABLE IF NOT EXISTS `comments` (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    message VARCHAR(2000) NOT NULL,
    send_time TIMESTAMP NOT NULL,

    FOREIGN KEY(user_id) REFERENCES `users`(user_id)
);

-- User comments on a post table
CREATE TABLE IF NOT EXISTS `post_comments` (
    post_id INT,
    comment_id INT,

    PRIMARY KEY(post_id, comment_id),
    FOREIGN KEY(post_id) REFERENCES `posts`(post_id),
    FOREIGN KEY(comment_id) REFERENCES `comments`(comment_id)
    
);

-- User in groups table
CREATE TABLE IF NOT EXISTS `user_groups` (
    user_id INT,
    group_id INT,
    
    PRIMARY KEY(user_id, group_id),
    FOREIGN KEY(user_id) REFERENCES `users`(user_id),
    FOREIGN KEY(group_id) REFERENCES `groups`(group_id) 
);

-- User saves posts
CREATE TABLE IF NOT EXISTS `user_saves` (
    user_id INT,
    comment_id INT,

    PRIMARY KEY(user_id, comment_id),
    FOREIGN KEY(user_id) REFERENCES `users`(user_id),
    FOREIGN KEY(comment_id) REFERENCES `comments`(comment_id)
);
