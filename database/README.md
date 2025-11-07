# 🗄️ Base de Données - BusCon

## 📋 Structure

Cette base de données gère un système complet de gestion de bus avec deux dashboards (Agence + Admin).

## 🚀 Installation

### Prérequis
- MySQL/MariaDB (via WAMP)
- phpMyAdmin (optionnel, pour l'interface graphique)

### Étapes

1. **Créer la base de données**
   ```sql
   -- Exécuter le fichier schema.sql dans phpMyAdmin ou MySQL CLI
   ```

2. **Remplir avec les données de test**
   ```sql
   -- Exécuter le fichier seed.sql
   ```

### Via phpMyAdmin

1. Ouvrir phpMyAdmin (http://localhost/phpmyadmin)
2. Créer une nouvelle base de données : `buscon_db`
3. Sélectionner la base `buscon_db`
4. Onglet "Importer"
5. Choisir `schema.sql` → Exécuter
6. Répéter pour `seed.sql`

### Via MySQL CLI

```bash
# Se connecter à MySQL
mysql -u root -p

# Créer et utiliser la base
CREATE DATABASE buscon_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE buscon_db;

# Exécuter les scripts
source C:/wamp64/www/Buscon/database/schema.sql
source C:/wamp64/www/Buscon/database/seed.sql
```

## 📊 Tables

### 1. **agences**
- Informations des agences de transport
- Code auto-généré : `AG-0001-TUN`
- Statut : actif/inactif

### 2. **utilisateurs**
- Utilisateurs du système (admin, agence, chauffeur)
- Lié à une agence (sauf admin)
- Rôles : admin, agence, chauffeur

### 3. **bus**
- Informations des bus
- Lié à une agence
- Statuts : en_service, panne, maintenance, hors_service

### 4. **chauffeurs**
- Informations des chauffeurs
- Lié à une agence
- Suivi des heures de conduite

### 5. **trajets**
- Trajets programmés
- Lié à un bus
- Statuts : planifie, en_cours, termine, annule

### 6. **affectations**
- Liaison chauffeur ↔ bus ↔ trajet
- Gestion des plannings

### 7. **maintenances**
- Historique des maintenances
- Types : revision, panne, reparation, entretien

### 8. **alertes**
- Système d'alertes
- Niveaux : info, warning, critique
- Lié à bus, agence, ou utilisateur

### 9. **points_de_ramassage**
- Points de ramassage des passagers
- Coordonnées GPS
- Lié à une agence

## 🔑 Comptes de Test

### Admin
- **Email** : `admin@transbus.tn`
- **Mot de passe** : `password123` (à hasher avec bcrypt en production)

### Agence Tunis
- **Email** : `agence.tunis@transbus.tn`
- **Mot de passe** : `password123`
- **Agence ID** : 1

### Agence Sfax
- **Email** : `agence.sfax@transbus.tn`
- **Mot de passe** : `password123`
- **Agence ID** : 2

## 📈 Statistiques (après seed)

- **5 agences** actives
- **100 bus** répartis (20 par agence)
- **50 chauffeurs** (10 par agence)
- **25 points de ramassage** (5 par agence)
- **5 trajets** d'exemple
- **4 alertes** d'exemple

## 🔧 Configuration Backend

### Variables d'environnement

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=buscon_db
DB_USER=root
DB_PASSWORD=
```

### Exemple de connexion (Node.js)

```javascript
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'buscon_db',
  charset: 'utf8mb4'
});
```

## 🔐 Sécurité

⚠️ **Important** : En production :
- Changer tous les mots de passe
- Utiliser bcrypt pour hasher les mots de passe
- Configurer les permissions MySQL
- Utiliser un utilisateur MySQL dédié (pas root)

## 📝 Notes

- Les mots de passe dans `seed.sql` sont des placeholders
- En production, utiliser bcrypt pour hasher les mots de passe
- Les codes agence sont générés automatiquement via trigger
- Les dates sont au format MySQL standard

## 🐛 Dépannage

### Erreur : "Table already exists"
```sql
DROP DATABASE IF EXISTS buscon_db;
CREATE DATABASE buscon_db;
-- Puis réexécuter schema.sql
```

### Erreur : "Foreign key constraint fails"
- Vérifier l'ordre d'insertion (agences avant utilisateurs/bus)
- Vérifier que les IDs référencés existent

### Erreur : "Character set"
- S'assurer que MySQL utilise utf8mb4
- Vérifier la configuration MySQL

---

**✅ Base de données prête à l'emploi !**

