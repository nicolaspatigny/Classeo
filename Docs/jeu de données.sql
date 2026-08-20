-- ============================================================================
-- JEU DE DONNÉES ÉTOFFÉ ET COHÉRENT - CLASSEO (SQL SERVER)
-- ============================================================================

-- 1. FILIÈRES
INSERT INTO filiere (nom) VALUES
                              ('Développement & Génie Logiciel'),
                              ('Infrastructures & Cybersécurité'),
                              ('Data & Intelligence Artificielle');

-- 2. CURSUS (filiere_id)
INSERT INTO cursus (nom, filiere_id) VALUES
                                         ('Concepteur Développeur d''Applications (CDA)', 1),
                                         ('Développeur Web et Web Mobile (DWWM)', 1),
                                         ('Administrateur Systèmes et Réseaux (ASR)', 2),
                                         ('Data Analyst', 3);

-- 3. COURS
INSERT INTO cours (nom, duree) VALUES
                                   ('Java / Spring Boot', 35),
                                   ('Bases de données SQL', 21),
                                   ('Angular - Frontend Advanced', 35),
                                   ('Méthodes Agiles & Scrum', 14),
                                   ('Linux & Administration Système', 28),
                                   ('Réseaux & Sécurité', 21),
                                   ('Python & Analyse de Données', 35);

-- 4. CURSUS_COURS (cursus_id, cours_id, ordre)
INSERT INTO cursus_cours (cursus_id, cours_id, ordre) VALUES
-- CDA
(1, 1, 1),
(1, 2, 2),
(1, 3, 3),
(1, 4, 4),
-- DWWM
(2, 2, 1),
(2, 3, 2),
(2, 4, 3),
-- ASR
(3, 5, 1),
(3, 6, 2),
-- Data Analyst
(4, 2, 1),
(4, 7, 2);

-- 5. SALLES
INSERT INTO salle (nom) VALUES
                            ('Salle Turing (A101)'),
                            ('Salle Lovelace (B204)'),
                            ('Amphi Dijkstra'),
                            ('Salle Hopper (C301)'),
                            ('Labo Info 1');

-- 6. UTILISATEURS (Départ à ID = 1)
SET IDENTITY_INSERT utilisateur ON;
INSERT INTO utilisateur (id, nom, prenom, date_naissance) VALUES
-- Admin (1)
(1, 'Boss', 'Admin', '1980-01-01'),
-- Formateurs (2 à 4)
(2, 'Dupont', 'Jean', '1985-05-12'),
(3, 'Curie', 'Marie', '1990-11-07'),
(4, 'Turing', 'Alan', '1982-06-23'),
-- Élèves (5 à 10)
(5, 'Martin', 'Alice', '2001-03-24'),
(6, 'Legrand', 'Bob', '2002-08-15'),
(7, 'Dubois', 'Chloé', '2000-12-01'),
(8, 'Bernard', 'David', '2001-07-19'),
(9, 'Petit', 'Emma', '2003-02-10'),
(10, 'Roux', 'Lucas', '2002-11-05');
SET IDENTITY_INSERT utilisateur OFF;

-- 7. AUTH (Même mot de passe hashé pour tous)mdp: password
INSERT INTO auth (user_id, login, password, authority) VALUES
                                                           (1, 'admin@classeo.fr', '$2a$10$COaeIJBJz1ztOSbaGkM8J.tUx0gAtlSihMHymlINDyp6e7XpbGuFS', 'ROLE_ADMINISTRATEUR'),
                                                           (2, 'jdupont@classeo.fr', '$2a$10$COaeIJBJz1ztOSbaGkM8J.tUx0gAtlSihMHymlINDyp6e7XpbGuFS', 'ROLE_ENSEIGNANT'),
                                                           (3, 'mcurie@classeo.fr', '$2a$10$COaeIJBJz1ztOSbaGkM8J.tUx0gAtlSihMHymlINDyp6e7XpbGuFS', 'ROLE_ENSEIGNANT'),
                                                           (4, 'aturing@classeo.fr', '$2a$10$COaeIJBJz1ztOSbaGkM8J.tUx0gAtlSihMHymlINDyp6e7XpbGuFS', 'ROLE_ENSEIGNANT'),
                                                           (5, 'alice.martin@student.fr', '$2a$10$COaeIJBJz1ztOSbaGkM8J.tUx0gAtlSihMHymlINDyp6e7XpbGuFS', 'ROLE_ELEVE'),
                                                           (6, 'bob.legrand@student.fr', '$2a$10$COaeIJBJz1ztOSbaGkM8J.tUx0gAtlSihMHymlINDyp6e7XpbGuFS', 'ROLE_ELEVE'),
                                                           (7, 'chloe.dubois@student.fr', '$2a$10$COaeIJBJz1ztOSbaGkM8J.tUx0gAtlSihMHymlINDyp6e7XpbGuFS', 'ROLE_ELEVE'),
                                                           (8, 'david.bernard@student.fr', '$2a$10$COaeIJBJz1ztOSbaGkM8J.tUx0gAtlSihMHymlINDyp6e7XpbGuFS', 'ROLE_ELEVE'),
                                                           (9, 'emma.petit@student.fr', '$2a$10$COaeIJBJz1ztOSbaGkM8J.tUx0gAtlSihMHymlINDyp6e7XpbGuFS', 'ROLE_ELEVE'),
                                                           (10, 'lucas.roux@student.fr', '$2a$10$COaeIJBJz1ztOSbaGkM8J.tUx0gAtlSihMHymlINDyp6e7XpbGuFS', 'ROLE_ELEVE');

-- 8. FORMATEURS (id -> utilisateur.id)
INSERT INTO formateur (id) VALUES
                               (2),
                               (3),
                               (4);

-- 9. ELEVES (id -> utilisateur.id)
INSERT INTO eleve (id) VALUES
                           (5),
                           (6),
                           (7),
                           (8),
                           (9),
                           (10);

-- 10. PROMOTIONS (cursus_id)
INSERT INTO promotion (nom, date_debut, date_fin, cursus_id) VALUES
                                                                 ('CDA Promo 2026', '2026-03-01', '2026-11-30', 1),
                                                                 ('DWWM Promo 2026', '2026-04-15', '2026-10-15', 2),
                                                                 ('ASR Promo 2026', '2026-02-01', '2026-09-30', 3);

-- 11. INSCRIPTION_PROMOTION (promotion_id, eleve_id)
INSERT INTO inscription_promotion (promotion_id, eleve_id, date_inscription) VALUES
-- CDA
(1, 5, '2026-02-15 10:00:00'), -- Alice
(1, 6, '2026-02-16 11:30:00'), -- Bob
(1, 8, '2026-02-18 09:15:00'), -- David
-- DWWM
(2, 7, '2026-03-01 14:00:00'), -- Chloé
(2, 9, '2026-03-05 16:45:00'), -- Emma
-- ASR
(3, 10, '2026-01-20 08:30:00'); -- Lucas

-- 12. COURS_PLANIFIES (promotion_id, formateur_id, cursus_id, cours_id, salle_id, date, heure_debut, heure_fin)
INSERT INTO cours_planifie (promotion_id, formateur_id, cursus_id, cours_id, salle_id, date, heure_debut, heure_fin) VALUES
-- CDA Promo 1
(1, 2, 1, 1, 1, '2026-08-20', '09:00:00', '17:00:00'), -- Java par Dupont (Salle Turing)
(1, 3, 1, 2, 2, '2026-08-21', '09:00:00', '17:00:00'), -- SQL par Curie (Salle Lovelace)
(1, 2, 1, 3, 3, '2026-08-22', '09:00:00', '17:00:00'), -- Angular par Dupont (Amphi)
(1, 4, 1, 4, 4, '2026-08-25', '09:00:00', '17:00:00'), -- Agiles par Turing (Salle Hopper)
-- DWWM Promo 2
(2, 3, 2, 2, 5, '2026-08-23', '09:00:00', '17:00:00'), -- SQL par Curie (Labo 1)
(2, 2, 2, 3, 2, '2026-08-26', '09:00:00', '17:00:00'), -- Angular par Dupont (Salle Lovelace)
-- ASR Promo 3
(3, 4, 3, 5, 5, '2026-08-20', '09:00:00', '17:00:00'); -- Linux par Turing (Labo 1)

-- 13. INSCRIPTION_COURS (cours_planifie_id, eleve_id, force)
INSERT INTO inscription_cours (cours_planifie_id, eleve_id, force) VALUES
-- Cours Java (CDA)
(1, 5, 0), -- Alice
(1, 6, 0), -- Bob
(1, 8, 0), -- David
-- Cours SQL (CDA)
(2, 5, 0), -- Alice
(2, 6, 1), -- Bob (forcé)
(2, 8, 0), -- David
-- Cours Angular (CDA)
(3, 5, 0), -- Alice
(3, 6, 0), -- Bob
-- Cours SQL (DWWM)
(5, 7, 0), -- Chloé
(5, 9, 0), -- Emma
-- Cours Linux (ASR)
(7, 10, 0); -- Lucas

-- 14. NOTES (cours_id, eleve_id, note)
INSERT INTO note (cours_id, eleve_id, note) VALUES
-- Alice Martin (5)
(1, 5, 16.50), -- Java
(2, 5, 14.00), -- SQL
(3, 5, 18.00), -- Angular
-- Bob Legrand (6)
(1, 6, 12.00), -- Java
(2, 6, 15.50), -- SQL
-- Chloé Dubois (7)
(2, 7, 13.00), -- SQL
-- David Bernard (8)
(1, 8, 14.50), -- Java
(2, 8, 11.00), -- SQL
-- Emma Petit (9)
(2, 9, 17.00), -- SQL
-- Lucas Roux (10)
(5, 10, 15.00); -- Linux