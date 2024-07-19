
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



CREATE TABLE subject(
    subject_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (user_id)
);  
CREATE TABLE comment(
    comment_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id INT UNSIGNED NOT NULL,
    subject_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (user_id),
    FOREIGN KEY (subject_id) REFERENCES subject (subject_id)
);
INSERT INTO user (pseudo, email, password, profile_picture, role_id) VALUES
('jean_doe', 'jean.doe@example.com', 'hashed_password_here', NULL, 2),
('marie_smith', 'marie.smith@example.com', 'hashed_password_here', NULL, 2),
('paul_brown', 'paul.brown@example.com', 'hashed_password_here', NULL, 2),
('lisa_blanc', 'lisa.blanc@example.com', 'hashed_password_here', NULL, 2),
('tom_noir', 'tom.noir@example.com', 'hashed_password_here', NULL, 2);


INSERT INTO subject (title, description, text, user_id) VALUES
('Aligner un div', 'Besoin d\'aide pour aligner un div en CSS', 'Quelqu\'un peut-il m\'aider à aligner un div au centre de la page en utilisant CSS?', 1),
('Dernier Star Wars', 'Avez-vous regardé le dernier film Star Wars?', 'Qu\'avez-vous pensé du dernier film Star Wars?', 2),
('Frameworks JavaScript', 'Meilleurs frameworks JavaScript en 2023', 'Quels sont les meilleurs frameworks JavaScript à apprendre en 2023?', 3),
('CSS Grid vs Flexbox', 'CSS Grid ou Flexbox?', 'Lequel devrais-je utiliser pour mon layout, CSS Grid ou Flexbox?', 4),
('Hooks React', 'Comprendre les Hooks React', 'Quelqu\'un peut-il expliquer comment utiliser les Hooks React?', 5),
('Python vs JavaScript', 'Python ou JavaScript pour le développement web?', 'Quel langage est meilleur pour le développement web, Python ou JavaScript?', 1),
('Vue.js vs React', 'Vue.js ou React?', 'Quel framework est meilleur pour construire des applications à grande échelle, Vue.js ou React?', 2),
('Performance Node.js', 'Améliorer la performance de Node.js', 'Comment puis-je améliorer la performance de mon application Node.js?', 3),
('Bases de Docker', 'Commencer avec Docker', 'Quelqu\'un peut-il expliquer les bases de Docker?', 4),
('Architecture Microservices', 'Microservices vs Architecture Monolithique', 'Laquelle est meilleure, les Microservices ou l\'architecture Monolithique?', 5),
('Programmation Asynchrone', 'Comprendre la programmation asynchrone', 'Comment gérer la programmation asynchrone en JavaScript?', 1),
('Bonnes pratiques CSS', 'Bonnes pratiques pour écrire du CSS', 'Quelles sont les bonnes pratiques pour écrire du CSS maintenable?', 2),
('Avantages de TypeScript', 'Pourquoi utiliser TypeScript?', 'Quels sont les avantages d\'utiliser TypeScript par rapport à JavaScript?', 3),
('Méthodologie Agile', 'Les avantages de la méthodologie Agile', 'Quels sont les avantages d\'utiliser la méthodologie Agile dans le développement logiciel?', 4),
('Outils DevOps', 'Meilleurs outils DevOps en 2023', 'Quels sont les meilleurs outils DevOps à utiliser en 2023?', 5),
('Bases de GraphQL', 'Introduction à GraphQL', 'Quelqu\'un peut-il expliquer les bases de GraphQL?', 1);


INSERT INTO comment (text, user_id, subject_id) VALUES
('Vous pouvez utiliser margin: auto pour centrer un div.', 2, 1),
('Essayez d\'utiliser flexbox pour centrer le div.', 3, 1),
('J\'ai vraiment aimé le dernier film Star Wars. Les effets visuels étaient incroyables.', 1, 2),
('Je pensais que le scénario était un peu faible.', 4, 2),
('Vue.js est plus facile à apprendre, mais React offre plus d\'opportunités d\'emploi.', 5, 3),
('Les deux sont excellents, mais cela dépend des besoins de votre projet.', 1, 3),
('CSS Grid est meilleur pour les layouts complexes.', 2, 4),
('Flexbox est plus facile à utiliser pour des layouts plus simples.', 3, 4),
('Les Hooks React vous permettent d\'utiliser l\'état et d\'autres fonctionnalités de React sans écrire de classe.', 4, 5),
('Consultez la documentation officielle de React sur les Hooks.', 5, 5),
('JavaScript est plus polyvalent pour le développement web.', 1, 6),
('Python est excellent pour le développement backend.', 2, 6),
('React a une plus grande communauté et plus de bibliothèques.', 3, 7),
('Vue.js a une meilleure documentation.', 4, 7),
('Utilisez un reverse proxy pour améliorer la performance de Node.js.', 5, 8),
('Optimisez vos requêtes de base de données.', 1, 8),
('Docker est une plateforme pour développer, expédier et exécuter des applications à l\'intérieur de conteneurs.', 2, 9),
('Consultez la documentation officielle de Docker pour les débutants.', 3, 9),
('Les Microservices offrent une meilleure évolutivité.', 4, 10),
('L\'architecture Monolithique est plus facile à gérer pour les petits projets.', 5, 10),
('Utilisez des Promesses ou async/await pour la programmation asynchrone en JavaScript.', 1, 11),
('Consultez la documentation MDN sur la programmation asynchrone.', 2, 11),
('Utilisez la méthodologie BEM pour écrire du CSS maintenable.', 3, 12),
('Organisez votre CSS en modules.', 4, 12),
('TypeScript offre une meilleure sécurité de typage.', 5, 13),
('Il aide à détecter les erreurs tôt pendant le développement.', 1, 13),
('Agile aide à livrer les projets plus rapidement.', 2, 14),
('Cela favorise une meilleure collaboration entre les membres de l\'équipe.', 3, 14),
('Jenkins et Docker sont des outils indispensables pour DevOps.', 4, 15),
('Consultez Kubernetes pour l\'orchestration des conteneurs.', 5, 15),
('GraphQL vous permet de demander exactement ce dont vous avez besoin.', 1, 16),
('Cela réduit le nombre de requêtes vers le serveur.', 2, 16);

CREATE TRIGGER before_user_insert
BEFORE INSERT ON User
FOR EACH ROW
BEGIN
    IF NEW.role_id IS NULL THEN
        SET NEW.role_id = (SELECT role_id FROM Role WHERE role = 'User');
    END IF;
END 

