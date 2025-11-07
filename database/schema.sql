-- ========================================
-- BASE DE DONNÉES : buscon_db
-- SGBD : MySQL (WAMP)
-- ========================================

CREATE DATABASE IF NOT EXISTS buscon_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE buscon_db;

-- ========================================
-- 1. Table : agences
-- ========================================
CREATE TABLE IF NOT EXISTS agences (
    id_agence INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(20) UNIQUE,
    nom VARCHAR(100) NOT NULL,
    ville VARCHAR(50) NOT NULL,
    adresse TEXT NOT NULL,
    telephone VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    responsable_id INT,
    statut VARCHAR(10) DEFAULT 'actif' CHECK (statut IN ('actif', 'inactif')),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_agence_statut (statut),
    INDEX idx_agence_ville (ville)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Trigger : Générer code agence (MySQL)
DELIMITER $$
CREATE TRIGGER trg_code_agence BEFORE INSERT ON agences
FOR EACH ROW
BEGIN
    IF NEW.code IS NULL OR NEW.code = '' THEN
        SET NEW.code = CONCAT('AG-', LPAD(NEW.id_agence, 4, '0'), '-', UPPER(LEFT(NEW.ville, 3)));
    END IF;
END$$
DELIMITER ;

-- ========================================
-- 2. Table : utilisateurs
-- ========================================
CREATE TABLE IF NOT EXISTS utilisateurs (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    telephone VARCHAR(20),
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'agence', 'chauffeur')),
    agence_id INT,
    statut VARCHAR(10) DEFAULT 'actif' CHECK (statut IN ('actif', 'inactif')),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    derniere_connexion TIMESTAMP NULL,
    FOREIGN KEY (agence_id) REFERENCES agences(id_agence) ON DELETE SET NULL,
    INDEX idx_user_email (email),
    INDEX idx_user_role (role),
    INDEX idx_user_agence (agence_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 3. Table : bus
-- ========================================
CREATE TABLE IF NOT EXISTS bus (
    id_bus INT AUTO_INCREMENT PRIMARY KEY,
    immatriculation VARCHAR(20) UNIQUE NOT NULL,
    marque VARCHAR(50) NOT NULL,
    modele VARCHAR(50) NOT NULL,
    annee INT CHECK (annee >= 2000),
    capacite INT NOT NULL CHECK (capacite > 0),
    kilometrage DECIMAL(12,2) DEFAULT 0,
    date_achat DATE,
    statut VARCHAR(20) DEFAULT 'en_service' 
        CHECK (statut IN ('en_service', 'panne', 'maintenance', 'hors_service')),
    gps_device_id VARCHAR(50),
    agence_id INT NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (agence_id) REFERENCES agences(id_agence) ON DELETE CASCADE,
    INDEX idx_bus_agence (agence_id),
    INDEX idx_bus_statut (statut),
    INDEX idx_bus_immatriculation (immatriculation)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 4. Table : chauffeurs
-- ========================================
CREATE TABLE IF NOT EXISTS chauffeurs (
    id_chauffeur INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    permis VARCHAR(30) NOT NULL,
    date_embauche DATE NOT NULL,
    heures_conduite_semaine INT DEFAULT 0,
    agence_id INT NOT NULL,
    statut VARCHAR(10) DEFAULT 'actif' CHECK (statut IN ('actif', 'inactif')),
    FOREIGN KEY (agence_id) REFERENCES agences(id_agence) ON DELETE CASCADE,
    INDEX idx_chauffeur_agence (agence_id),
    INDEX idx_chauffeur_statut (statut)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 5. Table : trajets
-- ========================================
CREATE TABLE IF NOT EXISTS trajets (
    id_trajet INT AUTO_INCREMENT PRIMARY KEY,
    ligne VARCHAR(50) NOT NULL,
    depart VARCHAR(100) NOT NULL,
    arrivee VARCHAR(100) NOT NULL,
    heure_depart TIME NOT NULL,
    heure_arrivee TIME NOT NULL,
    date_trajet DATE NOT NULL,
    nb_passagers INT DEFAULT 0,
    bus_id INT,
    statut VARCHAR(15) DEFAULT 'planifie' 
        CHECK (statut IN ('planifie', 'en_cours', 'termine', 'annule')),
    FOREIGN KEY (bus_id) REFERENCES bus(id_bus) ON DELETE SET NULL,
    INDEX idx_trajet_date (date_trajet),
    INDEX idx_trajet_bus (bus_id),
    INDEX idx_trajet_statut (statut)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 6. Table : affectations (chauffeur ↔ bus ↔ trajet)
-- ========================================
CREATE TABLE IF NOT EXISTS affectations (
    id_affectation INT AUTO_INCREMENT PRIMARY KEY,
    bus_id INT NOT NULL,
    chauffeur_id INT NOT NULL,
    trajet_id INT,
    date_debut TIMESTAMP NOT NULL,
    date_fin TIMESTAMP NULL,
    statut VARCHAR(15) DEFAULT 'prevue' 
        CHECK (statut IN ('prevue', 'en_cours', 'terminee', 'annulee')),
    FOREIGN KEY (bus_id) REFERENCES bus(id_bus) ON DELETE CASCADE,
    FOREIGN KEY (chauffeur_id) REFERENCES chauffeurs(id_chauffeur) ON DELETE CASCADE,
    FOREIGN KEY (trajet_id) REFERENCES trajets(id_trajet) ON DELETE SET NULL,
    INDEX idx_affectation_dates (date_debut, date_fin),
    INDEX idx_affectation_bus (bus_id),
    INDEX idx_affectation_chauffeur (chauffeur_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 7. Table : maintenances
-- ========================================
CREATE TABLE IF NOT EXISTS maintenances (
    id_maintenance INT AUTO_INCREMENT PRIMARY KEY,
    bus_id INT NOT NULL,
    type_maintenance VARCHAR(30) NOT NULL 
        CHECK (type_maintenance IN ('revision', 'panne', 'reparation', 'entretien')),
    date_debut TIMESTAMP NOT NULL,
    date_fin TIMESTAMP NULL,
    cout DECIMAL(10,2),
    description TEXT,
    statut VARCHAR(15) DEFAULT 'planifiee' 
        CHECK (statut IN ('planifiee', 'en_cours', 'terminee', 'annulee')),
    technicien VARCHAR(100),
    FOREIGN KEY (bus_id) REFERENCES bus(id_bus) ON DELETE CASCADE,
    INDEX idx_maintenance_bus (bus_id),
    INDEX idx_maintenance_statut (statut)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 8. Table : alertes
-- ========================================
CREATE TABLE IF NOT EXISTS alertes (
    id_alerte INT AUTO_INCREMENT PRIMARY KEY,
    type_alerte VARCHAR(50) NOT NULL,
    niveau VARCHAR(10) NOT NULL CHECK (niveau IN ('info', 'warning', 'critique')),
    message TEXT NOT NULL,
    date_alerte TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lu BOOLEAN DEFAULT FALSE,
    bus_id INT,
    agence_id INT,
    user_id INT,
    FOREIGN KEY (bus_id) REFERENCES bus(id_bus) ON DELETE CASCADE,
    FOREIGN KEY (agence_id) REFERENCES agences(id_agence) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES utilisateurs(id_user) ON DELETE SET NULL,
    INDEX idx_alerte_niveau (niveau),
    INDEX idx_alerte_lu (lu),
    INDEX idx_alerte_agence (agence_id),
    INDEX idx_alerte_bus (bus_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 9. Table : points_de_ramassage
-- ========================================
CREATE TABLE IF NOT EXISTS points_de_ramassage (
    id_point INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    adresse TEXT NOT NULL,
    contact VARCHAR(20),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    horaire_passage TIME,
    places_dispo INT DEFAULT 0,
    agence_id INT,
    statut VARCHAR(10) DEFAULT 'actif' CHECK (statut IN ('actif', 'inactif')),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (agence_id) REFERENCES agences(id_agence) ON DELETE SET NULL,
    INDEX idx_point_agence (agence_id),
    INDEX idx_point_coords (latitude, longitude)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

