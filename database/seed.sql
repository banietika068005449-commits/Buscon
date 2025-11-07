-- ========================================
-- DONNÉES DE TEST (SEED)
-- Base de données : buscon_db
-- ========================================

USE buscon_db;

-- ========================================
-- 1. Agences
-- ========================================
INSERT INTO agences (nom, ville, adresse, telephone, email, statut) VALUES
('Agence Tunis Centre', 'Tunis', '12 Avenue Habib Bourguiba, 1000 Tunis', '+216 71 123 456', 'tunis@transbus.tn', 'actif'),
('Agence Sfax', 'Sfax', '45 Rue de la République, 3000 Sfax', '+216 74 234 567', 'sfax@transbus.tn', 'actif'),
('Agence Sousse', 'Sousse', '78 Avenue Taïeb Mhiri, 4000 Sousse', '+216 73 345 678', 'sousse@transbus.tn', 'actif'),
('Agence Gabès', 'Gabès', '23 Rue Hédi Chaker, 6000 Gabès', '+216 75 456 789', 'gabes@transbus.tn', 'actif'),
('Agence Bizerte', 'Bizerte', '56 Boulevard de la Liberté, 7000 Bizerte', '+216 72 567 890', 'bizerte@transbus.tn', 'actif');

-- Mise à jour des codes agence après insertion
UPDATE agences SET code = CONCAT('AG-', LPAD(id_agence, 4, '0'), '-', UPPER(LEFT(ville, 3))) WHERE code IS NULL;

-- ========================================
-- 2. Utilisateurs (mot de passe = "password123" hashé avec bcrypt)
-- ========================================
-- Note: En production, utiliser bcrypt pour hasher les mots de passe
-- Ici, on utilise un hash bcrypt de "password123" pour tous les utilisateurs de test
INSERT INTO utilisateurs (email, mot_de_passe, nom, prenom, role, agence_id, statut) VALUES
-- Admin
('admin@transbus.tn', '$2b$10$rOzJqZqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', 'Admin', 'Système', 'admin', NULL, 'actif'),
-- Agence Tunis
('agence.tunis@transbus.tn', '$2b$10$rOzJqZqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZq', 'Ben', 'Salah', 'agence', 1, 'actif'),
-- Agence Sfax
('agence.sfax@transbus.tn', '$2b$10$rOzJqZqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZq', 'Ben', 'Ali', 'agence', 2, 'actif'),
-- Agence Sousse
('agence.sousse@transbus.tn', '$2b$10$rOzJqZqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZq', 'Ben', 'Amor', 'agence', 3, 'actif'),
-- Chauffeurs
('chauffeur1@transbus.tn', '$2b$10$rOzJqZqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZq', 'Mohamed', 'Trabelsi', 'chauffeur', 1, 'actif'),
('chauffeur2@transbus.tn', '$2b$10$rOzJqZqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZq', 'Ali', 'Ben Youssef', 'chauffeur', 2, 'actif');

-- ========================================
-- 3. Bus (100 bus répartis sur 5 agences)
-- ========================================
INSERT INTO bus (immatriculation, marque, modele, annee, capacite, kilometrage, date_achat, statut, agence_id) VALUES
-- Agence Tunis (20 bus)
('TU-001-AB', 'Mercedes', 'Sprinter', 2023, 19, 15000, '2023-01-15', 'en_service', 1),
('TU-002-CD', 'Mercedes', 'Sprinter', 2023, 19, 18000, '2023-02-10', 'en_service', 1),
('TU-003-EF', 'Toyota', 'Coaster', 2022, 30, 45000, '2022-03-20', 'en_service', 1),
('TU-004-GH', 'Toyota', 'Coaster', 2022, 30, 52000, '2022-04-05', 'en_service', 1),
('TU-005-IJ', 'Hyundai', 'County', 2023, 28, 12000, '2023-05-12', 'en_service', 1),
('TU-006-KL', 'Mercedes', 'Sprinter', 2021, 19, 85000, '2021-06-18', 'en_service', 1),
('TU-007-MN', 'Toyota', 'Hiace', 2022, 18, 38000, '2022-07-22', 'maintenance', 1),
('TU-008-OP', 'Mercedes', 'Sprinter', 2023, 19, 22000, '2023-08-30', 'en_service', 1),
('TU-009-QR', 'Toyota', 'Coaster', 2021, 30, 95000, '2021-09-14', 'en_service', 1),
('TU-010-ST', 'Hyundai', 'County', 2022, 28, 60000, '2022-10-25', 'en_service', 1),
('TU-011-UV', 'Mercedes', 'Sprinter', 2023, 19, 15000, '2023-11-08', 'en_service', 1),
('TU-012-WX', 'Toyota', 'Hiace', 2022, 18, 42000, '2022-12-15', 'en_service', 1),
('TU-013-YZ', 'Mercedes', 'Sprinter', 2021, 19, 78000, '2021-01-20', 'panne', 1),
('TU-014-AA', 'Toyota', 'Coaster', 2023, 30, 10000, '2023-02-28', 'en_service', 1),
('TU-015-BB', 'Hyundai', 'County', 2022, 28, 55000, '2022-03-10', 'en_service', 1),
('TU-016-CC', 'Mercedes', 'Sprinter', 2023, 19, 18000, '2023-04-18', 'en_service', 1),
('TU-017-DD', 'Toyota', 'Hiace', 2021, 18, 88000, '2021-05-25', 'maintenance', 1),
('TU-018-EE', 'Mercedes', 'Sprinter', 2022, 19, 65000, '2022-06-30', 'en_service', 1),
('TU-019-FF', 'Toyota', 'Coaster', 2023, 30, 12000, '2023-07-12', 'en_service', 1),
('TU-020-GG', 'Hyundai', 'County', 2022, 28, 48000, '2022-08-20', 'en_service', 1),
-- Agence Sfax (20 bus)
('SF-001-AB', 'Mercedes', 'Sprinter', 2023, 19, 16000, '2023-01-20', 'en_service', 2),
('SF-002-CD', 'Toyota', 'Coaster', 2022, 30, 47000, '2022-02-15', 'en_service', 2),
('SF-003-EF', 'Hyundai', 'County', 2023, 28, 13000, '2023-03-22', 'en_service', 2),
('SF-004-GH', 'Mercedes', 'Sprinter', 2021, 19, 82000, '2021-04-10', 'en_service', 2),
('SF-005-IJ', 'Toyota', 'Hiace', 2022, 18, 40000, '2022-05-18', 'en_service', 2),
('SF-006-KL', 'Mercedes', 'Sprinter', 2023, 19, 19000, '2023-06-25', 'en_service', 2),
('SF-007-MN', 'Toyota', 'Coaster', 2022, 30, 54000, '2022-07-30', 'maintenance', 2),
('SF-008-OP', 'Hyundai', 'County', 2023, 28, 11000, '2023-08-12', 'en_service', 2),
('SF-009-QR', 'Mercedes', 'Sprinter', 2021, 19, 90000, '2021-09-20', 'en_service', 2),
('SF-010-ST', 'Toyota', 'Hiace', 2022, 18, 36000, '2022-10-28', 'en_service', 2),
('SF-011-UV', 'Mercedes', 'Sprinter', 2023, 19, 17000, '2023-11-05', 'en_service', 2),
('SF-012-WX', 'Toyota', 'Coaster', 2022, 30, 50000, '2022-12-15', 'en_service', 2),
('SF-013-YZ', 'Hyundai', 'County', 2021, 28, 75000, '2021-01-22', 'panne', 2),
('SF-014-AA', 'Mercedes', 'Sprinter', 2023, 19, 14000, '2023-02-18', 'en_service', 2),
('SF-015-BB', 'Toyota', 'Hiace', 2022, 18, 43000, '2022-03-25', 'en_service', 2),
('SF-016-CC', 'Mercedes', 'Sprinter', 2021, 19, 80000, '2021-04-30', 'en_service', 2),
('SF-017-DD', 'Toyota', 'Coaster', 2023, 30, 15000, '2023-05-12', 'en_service', 2),
('SF-018-EE', 'Hyundai', 'County', 2022, 28, 58000, '2022-06-20', 'maintenance', 2),
('SF-019-FF', 'Mercedes', 'Sprinter', 2023, 19, 20000, '2023-07-28', 'en_service', 2),
('SF-020-GG', 'Toyota', 'Hiace', 2021, 18, 92000, '2021-08-15', 'en_service', 2),
-- Agence Sousse (20 bus)
('SO-001-AB', 'Mercedes', 'Sprinter', 2023, 19, 18000, '2023-01-25', 'en_service', 3),
('SO-002-CD', 'Toyota', 'Coaster', 2022, 30, 49000, '2022-02-20', 'en_service', 3),
('SO-003-EF', 'Hyundai', 'County', 2023, 28, 14000, '2023-03-28', 'en_service', 3),
('SO-004-GH', 'Mercedes', 'Sprinter', 2021, 19, 84000, '2021-04-15', 'en_service', 3),
('SO-005-IJ', 'Toyota', 'Hiace', 2022, 18, 41000, '2022-05-22', 'en_service', 3),
('SO-006-KL', 'Mercedes', 'Sprinter', 2023, 19, 21000, '2023-06-30', 'en_service', 3),
('SO-007-MN', 'Toyota', 'Coaster', 2022, 30, 56000, '2022-07-12', 'en_service', 3),
('SO-008-OP', 'Hyundai', 'County', 2023, 28, 12000, '2023-08-18', 'maintenance', 3),
('SO-009-QR', 'Mercedes', 'Sprinter', 2021, 19, 92000, '2021-09-25', 'en_service', 3),
('SO-010-ST', 'Toyota', 'Hiace', 2022, 18, 37000, '2022-10-30', 'en_service', 3),
('SO-011-UV', 'Mercedes', 'Sprinter', 2023, 19, 19000, '2023-11-08', 'en_service', 3),
('SO-012-WX', 'Toyota', 'Coaster', 2022, 30, 51000, '2022-12-18', 'en_service', 3),
('SO-013-YZ', 'Hyundai', 'County', 2021, 28, 77000, '2021-01-28', 'panne', 3),
('SO-014-AA', 'Mercedes', 'Sprinter', 2023, 19, 15000, '2023-02-22', 'en_service', 3),
('SO-015-BB', 'Toyota', 'Hiace', 2022, 18, 44000, '2022-03-30', 'en_service', 3),
('SO-016-CC', 'Mercedes', 'Sprinter', 2021, 19, 81000, '2021-04-12', 'en_service', 3),
('SO-017-DD', 'Toyota', 'Coaster', 2023, 30, 16000, '2023-05-18', 'en_service', 3),
('SO-018-EE', 'Hyundai', 'County', 2022, 28, 59000, '2022-06-25', 'en_service', 3),
('SO-019-FF', 'Mercedes', 'Sprinter', 2023, 19, 22000, '2023-07-30', 'maintenance', 3),
('SO-020-GG', 'Toyota', 'Hiace', 2021, 18, 93000, '2021-08-20', 'en_service', 3),
-- Agence Gabès (20 bus)
('GA-001-AB', 'Mercedes', 'Sprinter', 2023, 19, 17000, '2023-01-30', 'en_service', 4),
('GA-002-CD', 'Toyota', 'Coaster', 2022, 30, 48000, '2022-02-25', 'en_service', 4),
('GA-003-EF', 'Hyundai', 'County', 2023, 28, 13000, '2023-03-12', 'en_service', 4),
('GA-004-GH', 'Mercedes', 'Sprinter', 2021, 19, 83000, '2021-04-18', 'en_service', 4),
('GA-005-IJ', 'Toyota', 'Hiace', 2022, 18, 39000, '2022-05-28', 'en_service', 4),
('GA-006-KL', 'Mercedes', 'Sprinter', 2023, 19, 20000, '2023-06-12', 'en_service', 4),
('GA-007-MN', 'Toyota', 'Coaster', 2022, 30, 53000, '2022-07-20', 'en_service', 4),
('GA-008-OP', 'Hyundai', 'County', 2023, 28, 11000, '2023-08-25', 'maintenance', 4),
('GA-009-QR', 'Mercedes', 'Sprinter', 2021, 19, 91000, '2021-09-30', 'en_service', 4),
('GA-010-ST', 'Toyota', 'Hiace', 2022, 18, 35000, '2022-10-12', 'en_service', 4),
('GA-011-UV', 'Mercedes', 'Sprinter', 2023, 19, 18000, '2023-11-18', 'en_service', 4),
('GA-012-WX', 'Toyota', 'Coaster', 2022, 30, 49000, '2022-12-22', 'en_service', 4),
('GA-013-YZ', 'Hyundai', 'County', 2021, 28, 76000, '2021-01-15', 'panne', 4),
('GA-014-AA', 'Mercedes', 'Sprinter', 2023, 19, 14000, '2023-02-20', 'en_service', 4),
('GA-015-BB', 'Toyota', 'Hiace', 2022, 18, 42000, '2022-03-28', 'en_service', 4),
('GA-016-CC', 'Mercedes', 'Sprinter', 2021, 19, 79000, '2021-04-15', 'en_service', 4),
('GA-017-DD', 'Toyota', 'Coaster', 2023, 30, 17000, '2023-05-22', 'en_service', 4),
('GA-018-EE', 'Hyundai', 'County', 2022, 28, 60000, '2022-06-30', 'en_service', 4),
('GA-019-FF', 'Mercedes', 'Sprinter', 2023, 19, 23000, '2023-07-12', 'maintenance', 4),
('GA-020-GG', 'Toyota', 'Hiace', 2021, 18, 94000, '2021-08-25', 'en_service', 4),
-- Agence Bizerte (20 bus)
('BI-001-AB', 'Mercedes', 'Sprinter', 2023, 19, 16000, '2023-01-12', 'en_service', 5),
('BI-002-CD', 'Toyota', 'Coaster', 2022, 30, 47000, '2022-02-18', 'en_service', 5),
('BI-003-EF', 'Hyundai', 'County', 2023, 28, 12000, '2023-03-25', 'en_service', 5),
('BI-004-GH', 'Mercedes', 'Sprinter', 2021, 19, 85000, '2021-04-22', 'en_service', 5),
('BI-005-IJ', 'Toyota', 'Hiace', 2022, 18, 38000, '2022-05-30', 'en_service', 5),
('BI-006-KL', 'Mercedes', 'Sprinter', 2023, 19, 19000, '2023-06-15', 'en_service', 5),
('BI-007-MN', 'Toyota', 'Coaster', 2022, 30, 55000, '2022-07-22', 'en_service', 5),
('BI-008-OP', 'Hyundai', 'County', 2023, 28, 10000, '2023-08-28', 'maintenance', 5),
('BI-009-QR', 'Mercedes', 'Sprinter', 2021, 19, 89000, '2021-09-15', 'en_service', 5),
('BI-010-ST', 'Toyota', 'Hiace', 2022, 18, 34000, '2022-10-20', 'en_service', 5),
('BI-011-UV', 'Mercedes', 'Sprinter', 2023, 19, 17000, '2023-11-25', 'en_service', 5),
('BI-012-WX', 'Toyota', 'Coaster', 2022, 30, 48000, '2022-12-12', 'en_service', 5),
('BI-013-YZ', 'Hyundai', 'County', 2021, 28, 74000, '2021-01-18', 'panne', 5),
('BI-014-AA', 'Mercedes', 'Sprinter', 2023, 19, 13000, '2023-02-25', 'en_service', 5),
('BI-015-BB', 'Toyota', 'Hiace', 2022, 18, 41000, '2022-03-12', 'en_service', 5),
('BI-016-CC', 'Mercedes', 'Sprinter', 2021, 19, 78000, '2021-04-28', 'en_service', 5),
('BI-017-DD', 'Toyota', 'Coaster', 2023, 30, 18000, '2023-05-15', 'en_service', 5),
('BI-018-EE', 'Hyundai', 'County', 2022, 28, 61000, '2022-06-22', 'en_service', 5),
('BI-019-FF', 'Mercedes', 'Sprinter', 2023, 19, 24000, '2023-07-28', 'maintenance', 5),
('BI-020-GG', 'Toyota', 'Hiace', 2021, 18, 95000, '2021-08-12', 'en_service', 5);

-- ========================================
-- 4. Chauffeurs (10 par agence = 50 total)
-- ========================================
INSERT INTO chauffeurs (nom, prenom, permis, date_embauche, heures_conduite_semaine, agence_id, statut) VALUES
-- Agence Tunis (10 chauffeurs)
('Trabelsi', 'Mohamed', 'D-12345', '2020-01-15', 40, 1, 'actif'),
('Ben Salah', 'Ali', 'D-12346', '2020-03-20', 38, 1, 'actif'),
('Ben Youssef', 'Salah', 'D-12347', '2021-05-10', 42, 1, 'actif'),
('Gharbi', 'Hassan', 'D-12348', '2021-07-22', 35, 1, 'actif'),
('Mansouri', 'Karim', 'D-12349', '2022-02-14', 40, 1, 'actif'),
('Ben Amor', 'Tarek', 'D-12350', '2022-04-18', 36, 1, 'actif'),
('Jebali', 'Youssef', 'D-12351', '2022-06-25', 39, 1, 'actif'),
('Hamdi', 'Nabil', 'D-12352', '2023-01-10', 37, 1, 'actif'),
('Bouazizi', 'Ridha', 'D-12353', '2023-03-15', 41, 1, 'actif'),
('Khelifi', 'Walid', 'D-12354', '2023-05-20', 38, 1, 'actif'),
-- Agence Sfax (10 chauffeurs)
('Mahjoub', 'Ahmed', 'D-22345', '2020-02-10', 40, 2, 'actif'),
('Ben Ali', 'Mehdi', 'D-22346', '2020-04-15', 39, 2, 'actif'),
('Chaabane', 'Samir', 'D-22347', '2021-06-20', 37, 2, 'actif'),
('Dridi', 'Bilel', 'D-22348', '2021-08-25', 41, 2, 'actif'),
('Fadhel', 'Omar', 'D-22349', '2022-03-12', 38, 2, 'actif'),
('Ghanmi', 'Fares', 'D-22350', '2022-05-18', 40, 2, 'actif'),
('Haddad', 'Imed', 'D-22351', '2022-07-22', 36, 2, 'actif'),
('Jemai', 'Lamine', 'D-22352', '2023-02-15', 39, 2, 'actif'),
('Karray', 'Nizar', 'D-22353', '2023-04-20', 42, 2, 'actif'),
('Lahmar', 'Rami', 'D-22354', '2023-06-25', 38, 2, 'actif'),
-- Agence Sousse (10 chauffeurs)
('Mabrouk', 'Sofiene', 'D-32345', '2020-01-20', 40, 3, 'actif'),
('Nasri', 'Anis', 'D-32346', '2020-03-25', 38, 3, 'actif'),
('Oueslati', 'Bassem', 'D-32347', '2021-05-15', 41, 3, 'actif'),
('Pacha', 'Chokri', 'D-32348', '2021-07-28', 37, 3, 'actif'),
('Rahmani', 'Dhafer', 'D-32349', '2022-02-20', 39, 3, 'actif'),
('Sassi', 'Elyes', 'D-32350', '2022-04-25', 40, 3, 'actif'),
('Tlili', 'Ghazi', 'D-32351', '2022-06-30', 36, 3, 'actif'),
('Zaidi', 'Hichem', 'D-32352', '2023-01-18', 38, 3, 'actif'),
('Abid', 'Jalel', 'D-32353', '2023-03-22', 42, 3, 'actif'),
('Bouhlel', 'Kais', 'D-32354', '2023-05-28', 39, 3, 'actif'),
-- Agence Gabès (10 chauffeurs)
('Chebbi', 'Lotfi', 'D-42345', '2020-02-15', 40, 4, 'actif'),
('Dhaouadi', 'Mounir', 'D-42346', '2020-04-20', 38, 4, 'actif'),
('El Amri', 'Naceur', 'D-42347', '2021-06-25', 41, 4, 'actif'),
('Frikha', 'Oussama', 'D-42348', '2021-08-30', 37, 4, 'actif'),
('Gargouri', 'Pascal', 'D-42349', '2022-03-15', 39, 4, 'actif'),
('Hajji', 'Qais', 'D-42350', '2022-05-20', 40, 4, 'actif'),
('Issaoui', 'Rafik', 'D-42351', '2022-07-25', 36, 4, 'actif'),
('Jaziri', 'Sami', 'D-42352', '2023-02-18', 38, 4, 'actif'),
('Khelil', 'Tahar', 'D-42353', '2023-04-22', 42, 4, 'actif'),
('Lazreg', 'Wassim', 'D-42354', '2023-06-28', 39, 4, 'actif'),
-- Agence Bizerte (10 chauffeurs)
('Mannai', 'Youssef', 'D-52345', '2020-01-25', 40, 5, 'actif'),
('Naceur', 'Zied', 'D-52346', '2020-03-30', 38, 5, 'actif'),
('Ouali', 'Aymen', 'D-52347', '2021-05-20', 41, 5, 'actif'),
('Pouli', 'Bilel', 'D-52348', '2021-08-05', 37, 5, 'actif'),
('Rekik', 'Chaker', 'D-52349', '2022-02-25', 39, 5, 'actif'),
('Slimani', 'Dhafer', 'D-52350', '2022-04-30', 40, 5, 'actif'),
('Tounsi', 'Elyes', 'D-52351', '2022-07-05', 36, 5, 'actif'),
('Zouari', 'Fares', 'D-52352', '2023-01-22', 38, 5, 'actif'),
('Achour', 'Ghazi', 'D-52353', '2023-03-28', 42, 5, 'actif'),
('Bouazza', 'Hichem', 'D-52354', '2023-05-30', 39, 5, 'actif');

-- ========================================
-- 5. Points de ramassage (5 par agence)
-- ========================================
INSERT INTO points_de_ramassage (nom, adresse, contact, latitude, longitude, horaire_passage, places_dispo, agence_id, statut) VALUES
-- Agence Tunis
('Gare Routière Tunis', 'Place Barcelone, 1000 Tunis', '+216 71 111 111', 36.8065, 10.1815, '08:00:00', 20, 1, 'actif'),
('Aéroport Tunis-Carthage', 'Route de l''Aéroport, 1080 Tunis', '+216 71 222 222', 36.8510, 10.2262, '09:00:00', 15, 1, 'actif'),
('Station Métro Habib Bourguiba', 'Avenue Habib Bourguiba, 1000 Tunis', '+216 71 333 333', 36.8000, 10.1800, '07:30:00', 25, 1, 'actif'),
('Terminal Barcelone', 'Place Barcelone, 1000 Tunis', '+216 71 444 444', 36.8050, 10.1820, '08:30:00', 18, 1, 'actif'),
('Station TGM La Goulette', 'La Goulette, 2060 Tunis', '+216 71 555 555', 36.8180, 10.3050, '09:30:00', 12, 1, 'actif'),
-- Agence Sfax
('Gare Routière Sfax', 'Avenue Habib Bourguiba, 3000 Sfax', '+216 74 111 111', 34.7406, 10.7603, '08:00:00', 20, 2, 'actif'),
('Aéroport Sfax-Thyna', 'Route de l''Aéroport, 3029 Sfax', '+216 74 222 222', 34.7179, 10.6909, '09:00:00', 15, 2, 'actif'),
('Station Centre-Ville', 'Avenue de la République, 3000 Sfax', '+216 74 333 333', 34.7400, 10.7600, '07:30:00', 25, 2, 'actif'),
('Terminal Sakiet Ezzit', 'Sakiet Ezzit, 3000 Sfax', '+216 74 444 444', 34.7500, 10.7700, '08:30:00', 18, 2, 'actif'),
('Station Riadh', 'Riadh, 3000 Sfax', '+216 74 555 555', 34.7300, 10.7500, '09:30:00', 12, 2, 'actif'),
-- Agence Sousse
('Gare Routière Sousse', 'Avenue Taïeb Mhiri, 4000 Sousse', '+216 73 111 111', 35.8254, 10.6360, '08:00:00', 20, 3, 'actif'),
('Aéroport Enfidha-Hammamet', 'Route de l''Aéroport, 4030 Sousse', '+216 73 222 222', 36.0758, 10.4386, '09:00:00', 15, 3, 'actif'),
('Station Médina', 'Médina de Sousse, 4000 Sousse', '+216 73 333 333', 35.8270, 10.6380, '07:30:00', 25, 3, 'actif'),
('Terminal Port El Kantaoui', 'Port El Kantaoui, 4089 Sousse', '+216 73 444 444', 35.8900, 10.6000, '08:30:00', 18, 3, 'actif'),
('Station Hammam Sousse', 'Hammam Sousse, 4000 Sousse', '+216 73 555 555', 35.8500, 10.6500, '09:30:00', 12, 3, 'actif'),
-- Agence Gabès
('Gare Routière Gabès', 'Avenue Hédi Chaker, 6000 Gabès', '+216 75 111 111', 33.8815, 10.0983, '08:00:00', 20, 4, 'actif'),
('Station Centre-Ville', 'Avenue de la République, 6000 Gabès', '+216 75 222 222', 33.8820, 10.0990, '07:30:00', 25, 4, 'actif'),
('Terminal Chenini', 'Chenini, 6000 Gabès', '+216 75 333 333', 33.8900, 10.1100, '08:30:00', 18, 4, 'actif'),
('Station Ouedref', 'Ouedref, 6000 Gabès', '+216 75 444 444', 33.8700, 10.0800, '09:00:00', 15, 4, 'actif'),
('Station Ghannouch', 'Ghannouch, 6000 Gabès', '+216 75 555 555', 33.9000, 10.1200, '09:30:00', 12, 4, 'actif'),
-- Agence Bizerte
('Gare Routière Bizerte', 'Boulevard de la Liberté, 7000 Bizerte', '+216 72 111 111', 37.2744, 9.8739, '08:00:00', 20, 5, 'actif'),
('Station Centre-Ville', 'Avenue Habib Bourguiba, 7000 Bizerte', '+216 72 222 222', 37.2750, 9.8740, '07:30:00', 25, 5, 'actif'),
('Terminal Zarzouna', 'Zarzouna, 7000 Bizerte', '+216 72 333 333', 37.2800, 9.8800, '08:30:00', 18, 5, 'actif'),
('Station Menzel Bourguiba', 'Menzel Bourguiba, 7050 Bizerte', '+216 72 444 444', 37.1600, 9.7900, '09:00:00', 15, 5, 'actif'),
('Station Ferry Port', 'Port de Bizerte, 7000 Bizerte', '+216 72 555 555', 37.2900, 9.8900, '09:30:00', 12, 5, 'actif');

-- ========================================
-- 6. Trajets (exemples)
-- ========================================
INSERT INTO trajets (ligne, depart, arrivee, heure_depart, heure_arrivee, date_trajet, nb_passagers, bus_id, statut) VALUES
('L1', 'Tunis', 'Sfax', '08:00:00', '12:00:00', CURDATE(), 0, 1, 'planifie'),
('L2', 'Sfax', 'Sousse', '09:00:00', '11:30:00', CURDATE(), 0, 21, 'planifie'),
('L3', 'Sousse', 'Tunis', '14:00:00', '17:00:00', CURDATE(), 0, 41, 'planifie'),
('L4', 'Tunis', 'Gabès', '07:00:00', '11:00:00', CURDATE(), 0, 61, 'planifie'),
('L5', 'Gabès', 'Bizerte', '10:00:00', '15:00:00', CURDATE(), 0, 81, 'planifie');

-- ========================================
-- 7. Alertes (exemples)
-- ========================================
INSERT INTO alertes (type_alerte, niveau, message, bus_id, agence_id, lu) VALUES
('Maintenance requise', 'warning', 'Bus TU-007-MN nécessite une révision', 7, 1, FALSE),
('Panne', 'critique', 'Bus TU-013-YZ en panne - intervention urgente requise', 13, 1, FALSE),
('Kilométrage élevé', 'info', 'Bus SF-013-YZ approche les 75000 km', 33, 2, FALSE),
('Maintenance préventive', 'warning', 'Bus SO-008-OP nécessite un entretien', 28, 3, FALSE);

