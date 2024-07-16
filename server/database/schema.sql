
-- SQLBook: Code
CREATE TABLE role (
    role_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    role VARCHAR(80) 
);


CREATE TABLE user (
    user_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    pseudo VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255) NULL,
    role_id INT UNSIGNED NULL,
    FOREIGN KEY (role_id) REFERENCES role (role_id)
);


INSERT INTO role (role) VALUES 
('Admin'),
('User'),
('Manager'),
('Guest'),
('Operator');

CREATE TRIGGER before_user_insert
BEFORE INSERT ON User
FOR EACH ROW
BEGIN
    IF NEW.role_id IS NULL THEN
        SET NEW.role_id = (SELECT role_id FROM Role WHERE role = 'User');
    END IF;
END 

