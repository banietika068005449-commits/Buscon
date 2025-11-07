# 🔧 Scripts de Correction et Nettoyage

Ce projet inclut plusieurs scripts pour effectuer un nettoyage complet et une réinstallation propre de votre projet, particulièrement utile avant un déploiement sur Vercel ou d'autres plateformes.

## 📋 Ce que font ces scripts

Les scripts effectuent les opérations suivantes dans l'ordre :

1. **🗑️ Suppression** : Supprime `node_modules`, `yarn.lock`, et `package-lock.json`
2. **🧹 Nettoyage du cache** : Nettoie le cache de yarn ou npm
3. **📥 Réinstallation** : Réinstalle toutes les dépendances proprement
4. **📦 Vérification Rollup** : Vérifie et ajoute Rollup si nécessaire
5. **⬆️ Mise à jour** : Met à jour Vite et Rollup vers les dernières versions
6. **🏗️ Build** : Reconstruit le projet

## 🚀 Utilisation

### Méthode recommandée (Cross-platform)

```bash
yarn fix:build
# ou
npm run fix:build
```

Cette commande utilise le script Node.js qui détecte automatiquement votre gestionnaire de paquets (yarn ou npm).

### Scripts alternatifs dans package.json

Si vous préférez utiliser directement les commandes dans package.json :

```bash
# Avec Yarn
yarn fix:build:yarn

# Avec NPM
npm run fix:build:npm
```

### Scripts shell natifs

#### Windows PowerShell
```powershell
.\fix-build.ps1
```

#### Windows CMD
```cmd
fix-build.bat
```

#### Linux/Mac (Bash)
```bash
chmod +x fix-build.sh
./fix-build.sh
```

## 💡 Quand utiliser ces scripts ?

- ✅ Avant un déploiement sur Vercel
- ✅ Après des erreurs de build inexpliquées
- ✅ Après des conflits de dépendances
- ✅ Après une mise à jour majeure de Node.js
- ✅ Quand le build échoue sans raison apparente

## ⚠️ Notes importantes

- Les scripts détectent automatiquement si vous utilisez `yarn` ou `npm` en vérifiant la présence de `yarn.lock` ou `package-lock.json`
- Le script principal (`fix:build`) est compatible avec Windows, Linux et Mac
- Les scripts shell natifs sont spécifiques à chaque système d'exploitation

## 🔍 Dépannage

Si vous rencontrez des erreurs :

1. Vérifiez que vous êtes dans le répertoire racine du projet
2. Assurez-vous d'avoir Node.js installé
3. Vérifiez que vous avez les permissions nécessaires pour supprimer des fichiers
4. Sur Windows, vous devrez peut-être exécuter PowerShell en tant qu'administrateur

## 📝 Structure des fichiers

```
Buscon/
├── scripts/
│   └── fix-build.js      # Script Node.js principal (cross-platform)
├── fix-build.ps1         # Script PowerShell pour Windows
├── fix-build.bat         # Script Batch pour Windows CMD
├── fix-build.sh          # Script Bash pour Linux/Mac
└── package.json          # Contient les scripts npm/yarn
```

