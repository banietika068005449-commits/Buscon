#!/bin/bash
# Script pour régénérer proprement yarn.lock
# À lancer AVANT chaque commit si package.json a changé

echo "🔄 Régénération du yarn.lock..."
echo ""

# 1. Nettoyage
echo "🧹 Nettoyage..."
rm -rf node_modules/ .vercel_build_output/
yarn cache clean --all
echo "   ✓ Nettoyage terminé"
echo ""

# 2. Réinstallation
echo "📥 Réinstallation des dépendances..."
yarn install
echo "   ✓ yarn.lock régénéré"
echo ""

# 3. Vérification
if [ -f "yarn.lock" ]; then
    echo "✅ yarn.lock créé/mis à jour avec succès"
    echo ""
    echo "📝 Prochaines étapes :"
    echo "   git add yarn.lock"
    echo "   git commit -m 'chore: update yarn.lock'"
    echo "   git push"
else
    echo "❌ Erreur : yarn.lock n'a pas été créé"
    exit 1
fi

