USE warrior_chat_db;
ALTER TABLE posts MODIFY message MEDIUMTEXT NOT NULL;
CREATE TABLE IF NOT EXISTS dashboard_post_attachments (
    post_id INT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    mime VARCHAR(80) NOT NULL,
    contents MEDIUMBLOB NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
);

INSERT INTO `groups` (group_name)
SELECT 'General' WHERE NOT EXISTS (SELECT 1 FROM `groups` WHERE group_name = 'General');
