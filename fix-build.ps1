# Script PowerShell de nettoyage complet et réinstallation propre
# Pour Windows

Write-Host "🔧 Nettoyage complet et réinstallation propre" -ForegroundColor Cyan
Write-Host ""

# Détection du gestionnaire de paquets
$hasYarn = Test-Path "yarn.lock"
$packageManager = if ($hasYarn) { "yarn" } else { "npm" }

Write-Host "📦 Gestionnaire de paquets détecté: $packageManager" -ForegroundColor Yellow
Write-Host ""

try {
    # 1. Suppression des dossiers et fichiers
    Write-Host "🗑️  Suppression de node_modules, yarn.lock, package-lock.json..." -ForegroundColor Yellow
    
    if (Test-Path "node_modules") {
        Remove-Item -Recurse -Force "node_modules"
        Write-Host "   ✓ Supprimé: node_modules" -ForegroundColor Green
    }
    
    if (Test-Path "yarn.lock") {
        Remove-Item -Force "yarn.lock"
        Write-Host "   ✓ Supprimé: yarn.lock" -ForegroundColor Green
    }
    
    if (Test-Path "package-lock.json") {
        Remove-Item -Force "package-lock.json"
        Write-Host "   ✓ Supprimé: package-lock.json" -ForegroundColor Green
    }

    # 2. Nettoyage du cache
    Write-Host ""
    Write-Host "🧹 Nettoyage du cache..." -ForegroundColor Yellow
    if ($packageManager -eq "yarn") {
        yarn cache clean --all
    } else {
        npm cache clean --force
    }
    Write-Host "   ✓ Cache nettoyé" -ForegroundColor Green

    # 3. Réinstallation des dépendances
    Write-Host ""
    Write-Host "📥 Réinstallation des dépendances..." -ForegroundColor Yellow
    if ($packageManager -eq "yarn") {
        yarn install
    } else {
        npm install
    }
    Write-Host "   ✓ Dépendances réinstallées" -ForegroundColor Green

    # 4. Vérification et ajout de Rollup
    Write-Host ""
    Write-Host "📦 Vérification de Rollup..." -ForegroundColor Yellow
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    $hasRollup = ($packageJson.devDependencies.rollup -ne $null) -or ($packageJson.dependencies.rollup -ne $null)
    
    if (-not $hasRollup) {
        Write-Host "   ⚠️  Rollup non trouvé, ajout en cours..." -ForegroundColor Yellow
        if ($packageManager -eq "yarn") {
            yarn add -D rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs
        } else {
            npm install -D rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs
        }
        Write-Host "   ✓ Rollup ajouté" -ForegroundColor Green
    } else {
        Write-Host "   ✓ Rollup déjà présent" -ForegroundColor Green
    }

    # 5. Mise à jour des dépendances principales
    Write-Host ""
    Write-Host "⬆️  Mise à jour de Vite et Rollup..." -ForegroundColor Yellow
    if ($packageManager -eq "yarn") {
        yarn upgrade vite rollup
    } else {
        npm update vite rollup
    }
    Write-Host "   ✓ Dépendances mises à jour" -ForegroundColor Green

    # 6. Reconstruction du projet
    Write-Host ""
    Write-Host "🏗️  Reconstruction du projet..." -ForegroundColor Yellow
    if ($packageManager -eq "yarn") {
        yarn build
    } else {
        npm run build
    }
    Write-Host "   ✓ Build terminé" -ForegroundColor Green

    Write-Host ""
    Write-Host "✅ Nettoyage et réinstallation terminés avec succès!" -ForegroundColor Green
    Write-Host "🚀 Votre projet est prêt pour le déploiement." -ForegroundColor Cyan
    Write-Host ""

} catch {
    Write-Host ""
    Write-Host "❌ Erreur lors du processus: $_" -ForegroundColor Red
    exit 1
}

