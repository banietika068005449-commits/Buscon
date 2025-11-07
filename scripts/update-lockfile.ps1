# Script PowerShell pour régénérer proprement yarn.lock
# À lancer AVANT chaque commit si package.json a changé

Write-Host "🔄 Régénération du yarn.lock..." -ForegroundColor Cyan
Write-Host ""

# 1. Nettoyage
Write-Host "🧹 Nettoyage..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
}
if (Test-Path ".vercel_build_output") {
    Remove-Item -Recurse -Force ".vercel_build_output"
}
yarn cache clean --all
Write-Host "   ✓ Nettoyage terminé" -ForegroundColor Green
Write-Host ""

# 2. Réinstallation
Write-Host "📥 Réinstallation des dépendances..." -ForegroundColor Yellow
yarn install
Write-Host "   ✓ yarn.lock régénéré" -ForegroundColor Green
Write-Host ""

# 3. Vérification
if (Test-Path "yarn.lock") {
    Write-Host "✅ yarn.lock créé/mis à jour avec succès" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Prochaines étapes :" -ForegroundColor Cyan
    Write-Host "   git add yarn.lock"
    Write-Host "   git commit -m 'chore: update yarn.lock'"
    Write-Host "   git push"
} else {
    Write-Host "❌ Erreur : yarn.lock n'a pas été créé" -ForegroundColor Red
    exit 1
}

