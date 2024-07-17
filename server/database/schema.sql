
-- SQLBook: Code
CREATE TABLE role (
    role_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    role VARCHAR(80) 
);

INSERT INTO role (role) VALUES 
('Admin'),
('User'),
('Manager'),
('Guest'),
('Operator');

CREATE TABLE user (
    user_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    pseudo VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255) NULL,
    role_id INT UNSIGNED NULL,
    FOREIGN KEY (role_id) REFERENCES role (role_id)
);
INSERT INTO user (pseudo, email, password,  role_id)
VALUES ('john_doe', 'john.doe@example.com', 'hashed_password_here', 2);


CREATE TABLE subject(
    subject_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (user_id)
);  

CREATE TRIGGER before_user_insert
BEFORE INSERT ON User
FOR EACH ROW
BEGIN
    IF NEW.role_id IS NULL THEN
        SET NEW.role_id = (SELECT role_id FROM Role WHERE role = 'User');
    END IF;
END 

