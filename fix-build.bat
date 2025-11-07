@echo off
REM Script Batch de nettoyage complet et réinstallation propre
REM Pour Windows (CMD)

echo 🔧 Nettoyage complet et réinstallation propre
echo.

REM Détection du gestionnaire de paquets
if exist yarn.lock (
    set PACKAGE_MANAGER=yarn
) else (
    set PACKAGE_MANAGER=npm
)

echo 📦 Gestionnaire de paquets détecté: %PACKAGE_MANAGER%
echo.

REM 1. Suppression des dossiers et fichiers
echo 🗑️  Suppression de node_modules, yarn.lock, package-lock.json...

if exist node_modules (
    rmdir /s /q node_modules
    echo    ✓ Supprimé: node_modules
)

if exist yarn.lock (
    del /f /q yarn.lock
    echo    ✓ Supprimé: yarn.lock
)

if exist package-lock.json (
    del /f /q package-lock.json
    echo    ✓ Supprimé: package-lock.json
)

REM 2. Nettoyage du cache
echo.
echo 🧹 Nettoyage du cache...
if "%PACKAGE_MANAGER%"=="yarn" (
    yarn cache clean --all
) else (
    npm cache clean --force
)
echo    ✓ Cache nettoyé

REM 3. Réinstallation des dépendances
echo.
echo 📥 Réinstallation des dépendances...
if "%PACKAGE_MANAGER%"=="yarn" (
    yarn install
) else (
    npm install
)
echo    ✓ Dépendances réinstallées

REM 4. Ajout de Rollup (vérification basique)
echo.
echo 📦 Vérification et ajout de Rollup...
if "%PACKAGE_MANAGER%"=="yarn" (
    yarn add -D rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs
) else (
    npm install -D rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs
)
echo    ✓ Rollup ajouté

REM 5. Mise à jour des dépendances principales
echo.
echo ⬆️  Mise à jour de Vite et Rollup...
if "%PACKAGE_MANAGER%"=="yarn" (
    yarn upgrade vite rollup
) else (
    npm update vite rollup
)
echo    ✓ Dépendances mises à jour

REM 6. Reconstruction du projet
echo.
echo 🏗️  Reconstruction du projet...
if "%PACKAGE_MANAGER%"=="yarn" (
    yarn build
) else (
    npm run build
)
echo    ✓ Build terminé

echo.
echo ✅ Nettoyage et réinstallation terminés avec succès!
echo 🚀 Votre projet est prêt pour le déploiement.
echo.

pause

