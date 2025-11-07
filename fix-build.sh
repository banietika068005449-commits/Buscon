#!/bin/bash
# Script Bash de nettoyage complet et réinstallation propre
# Pour Linux/Mac

echo "🔧 Nettoyage complet et réinstallation propre"
echo ""

# Détection du gestionnaire de paquets
if [ -f "yarn.lock" ]; then
    PACKAGE_MANAGER="yarn"
else
    PACKAGE_MANAGER="npm"
fi

echo "📦 Gestionnaire de paquets détecté: $PACKAGE_MANAGER"
echo ""

# 1. Suppression des dossiers et fichiers
echo "🗑️  Suppression de node_modules, yarn.lock, package-lock.json..."

if [ -d "node_modules" ]; then
    rm -rf node_modules
    echo "   ✓ Supprimé: node_modules"
fi

if [ -f "yarn.lock" ]; then
    rm -f yarn.lock
    echo "   ✓ Supprimé: yarn.lock"
fi

if [ -f "package-lock.json" ]; then
    rm -f package-lock.json
    echo "   ✓ Supprimé: package-lock.json"
fi

# 2. Nettoyage du cache
echo ""
echo "🧹 Nettoyage du cache..."
if [ "$PACKAGE_MANAGER" = "yarn" ]; then
    yarn cache clean --all
else
    npm cache clean --force
fi
echo "   ✓ Cache nettoyé"

# 3. Réinstallation des dépendances
echo ""
echo "📥 Réinstallation des dépendances..."
if [ "$PACKAGE_MANAGER" = "yarn" ]; then
    yarn install
else
    npm install
fi
echo "   ✓ Dépendances réinstallées"

# 4. Vérification et ajout de Rollup
echo ""
echo "📦 Vérification de Rollup..."
if ! grep -q '"rollup"' package.json; then
    echo "   ⚠️  Rollup non trouvé, ajout en cours..."
    if [ "$PACKAGE_MANAGER" = "yarn" ]; then
        yarn add -D rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs
    else
        npm install -D rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs
    fi
    echo "   ✓ Rollup ajouté"
else
    echo "   ✓ Rollup déjà présent"
fi

# 5. Mise à jour des dépendances principales
echo ""
echo "⬆️  Mise à jour de Vite et Rollup..."
if [ "$PACKAGE_MANAGER" = "yarn" ]; then
    yarn upgrade vite rollup
else
    npm update vite rollup
fi
echo "   ✓ Dépendances mises à jour"

# 6. Reconstruction du projet
echo ""
echo "🏗️  Reconstruction du projet..."
if [ "$PACKAGE_MANAGER" = "yarn" ]; then
    yarn build
else
    npm run build
fi
echo "   ✓ Build terminé"

echo ""
echo "✅ Nettoyage et réinstallation terminés avec succès!"
echo "🚀 Votre projet est prêt pour le déploiement."
echo ""

