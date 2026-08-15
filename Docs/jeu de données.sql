-- ============================================================================
-- JEU DE DONNÉES COMPLET - CLASSEO (SQL SERVER)
-- ============================================================================

-- 1. FILIÈRES
INSERT INTO filiere (nom) VALUES 
('Développement & Génie Logiciel'),
('Infrastructures & Cybersécurité');

-- 2. CURSUS (filiere_id)
INSERT INTO cursus (nom, filiere_id) VALUES 
('Concepteur Développeur d''Applications (CDA)', 1),
('Développeur Web et Web Mobile (DWWM)', 1);

-- 3. COURS
INSERT INTO cours (nom, duree) VALUES 
('Java / Spring Boot', 35),
('Bases de données SQL', 21),
('Angular - Frontend Advanced', 35),
('Méthodes Agiles & Scrum', 14);

-- 4. CURSUS_COURS (cursus_id, cours_id, ordre)
INSERT INTO cursus_cours (cursus_id, cours_id, ordre) VALUES 
(1, 1, 1),
(1, 2, 2),
(1, 3, 3),
(2, 2, 1),
(2, 3, 2);

-- 5. SALLES
INSERT INTO salle (nom) VALUES 
('Salle Turing (A101)'),
('Salle Lovelace (B204)'),
('Amphi Dijkstra');

-- 6. UTILISATEURS (Génère IDs 1 à 5)
INSERT INTO utilisateur (nom, prenom, date_naissance) VALUES 
('Dupont', 'Jean', '1985-05-12'),   -- ID 1 (Formateur)
('Curie', 'Marie', '1990-11-07'),   -- ID 2 (Formateur)
('Martin', 'Alice', '2001-03-24'), -- ID 3 (Élève)
('Legrand', 'Bob', '2002-08-15'),   -- ID 4 (Élève)
('Dubois', 'Chloé', '2000-12-01');  -- ID 5 (Élève)

-- 7. AUTH (user_id)
INSERT INTO auth (user_id, login, password, authority) VALUES 
(2, 'jdupont@classeo.fr', '$2a$10$e8...hash1', 'ROLE_FORMATEUR'), --saut de id pour etre compatible avec le user dartstart
(3, 'mcurie@classeo.fr', '$2a$10$e8...hash2', 'ROLE_FORMATEUR'),
(4, 'alice.martin@student.fr', '$2a$10$e8...hash3', 'ROLE_ELEVE'),
(5, 'bob.legrand@student.fr', '$2a$10$e8...hash4', 'ROLE_ELEVE'),
(6, 'chloe.dubois@student.fr', '$2a$10$e8...hash5', 'ROLE_ELEVE');

-- 8. FORMATEURS (id -> utilisateur.id)
INSERT INTO formateur (id) VALUES 
(1),
(2);

-- 9. ELEVES (id -> utilisateur.id)
INSERT INTO eleve (id) VALUES 
(3),
(4),
(5);

-- 10. PROMOTIONS (cursus_id)
INSERT INTO promotion (nom, date_debut, date_fin, cursus_id) VALUES 
('CDA Promo 2026', '2026-03-01', '2026-11-30', 1),
('DWWM Promo 2026', '2026-04-15', '2026-10-15', 2);

-- 11. INSCRIPTION_PROMOTION (promotion_id, eleve_id)
INSERT INTO inscription_promotion (promotion_id, eleve_id, date_inscription) VALUES 
(1, 3, '2026-02-15 10:00:00'), -- Alice dans CDA 2026
(1, 4, '2026-02-16 11:30:00'), -- Bob dans CDA 2026
(2, 5, '2026-03-01 14:00:00'); -- Chloé dans DWWM 2026

-- ============================================================================
-- 12. COURS_PLANIFIES (Chaque cours n'apparaît qu'une seule fois par promotion)
-- ============================================================================
INSERT INTO cours_planifie (promotion_id, formateur_id, cursus_id, cours_id, salle_id, date, heure_debut, heure_fin) VALUES 
(1, 1, 1, 1, 1, '2026-08-20', '09:00:00', '17:00:00'), -- Java (cours_id 1) pour Promo 1
(1, 2, 1, 2, 2, '2026-08-21', '09:00:00', '17:00:00'), -- SQL (cours_id 2) pour Promo 1
(1, 1, 1, 3, 3, '2026-08-22', '09:00:00', '17:00:00'), -- Angular (cours_id 3) pour Promo 1
(1, 1, 2, 2, 3, '2026-08-23', '09:00:00', '17:00:00');

-- ============================================================================
-- 13. INSCRIPTION_COURS
-- ============================================================================
INSERT INTO inscription_cours (cours_planifie_id, eleve_id, force) VALUES 
(1, 3, 0), -- Alice au cours Java (id 1)
(1, 4, 0), -- Bob au cours Java (id 1)
(2, 3, 0), -- Alice au cours SQL (id 2)
(2, 4, 1), -- Bob inscrit DE FORCE au cours SQL (id 2)
(3, 3, 0); -- Alice au cours Angular (id 3)