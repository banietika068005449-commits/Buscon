@echo off
REM Script Batch pour régénérer proprement yarn.lock
REM À lancer AVANT chaque commit si package.json a changé

echo 🔄 Régénération du yarn.lock...
echo.

REM 1. Nettoyage
echo 🧹 Nettoyage...
if exist node_modules (
    rmdir /s /q node_modules
)
if exist .vercel_build_output (
    rmdir /s /q .vercel_build_output
)
yarn cache clean --all
echo    ✓ Nettoyage terminé
echo.

REM 2. Réinstallation
echo 📥 Réinstallation des dépendances...
yarn install
echo    ✓ yarn.lock régénéré
echo.

REM 3. Vérification
if exist yarn.lock (
    echo ✅ yarn.lock créé/mis à jour avec succès
    echo.
    echo 📝 Prochaines étapes :
    echo    git add yarn.lock
    echo    git commit -m "chore: update yarn.lock"
    echo    git push
) else (
    echo ❌ Erreur : yarn.lock n'a pas été créé
    exit /b 1
)

pause

