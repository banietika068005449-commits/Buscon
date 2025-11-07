#!/usr/bin/env node

/**
 * Script de nettoyage complet et réinstallation propre
 * Compatible Windows, Linux et Mac
 */

import { execSync } from 'child_process';
import { existsSync, rmSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Détection du gestionnaire de paquets
const hasYarn = existsSync(join(projectRoot, 'yarn.lock'));
const hasNpm = existsSync(join(projectRoot, 'package-lock.json'));
const packageManager = hasYarn ? 'yarn' : 'npm';

console.log('🔧 Nettoyage complet et réinstallation propre\n');
console.log(`📦 Gestionnaire de paquets détecté: ${packageManager}\n`);

try {
  // 1. Suppression des dossiers et fichiers
  console.log('🗑️  Suppression de node_modules, yarn.lock, package-lock.json...');
  const toRemove = [
    join(projectRoot, 'node_modules'),
    join(projectRoot, 'yarn.lock'),
    join(projectRoot, 'package-lock.json')
  ];
  
  toRemove.forEach(path => {
    if (existsSync(path)) {
      rmSync(path, { recursive: true, force: true });
      console.log(`   ✓ Supprimé: ${path.split(/[/\\]/).pop()}`);
    }
  });

  // 2. Nettoyage du cache
  console.log('\n🧹 Nettoyage du cache...');
  if (packageManager === 'yarn') {
    execSync('yarn cache clean --all', { stdio: 'inherit', cwd: projectRoot });
  } else {
    execSync('npm cache clean --force', { stdio: 'inherit', cwd: projectRoot });
  }
  console.log('   ✓ Cache nettoyé');

  // 3. Réinstallation des dépendances
  console.log('\n📥 Réinstallation des dépendances...');
  if (packageManager === 'yarn') {
    execSync('yarn install', { stdio: 'inherit', cwd: projectRoot });
  } else {
    execSync('npm install', { stdio: 'inherit', cwd: projectRoot });
  }
  console.log('   ✓ Dépendances réinstallées');

  // 4. Vérification et ajout de Rollup
  console.log('\n📦 Vérification de Rollup...');
  const packageJson = JSON.parse(
    readFileSync(join(projectRoot, 'package.json'), 'utf8')
  );
  const hasRollup = packageJson.devDependencies?.rollup || packageJson.dependencies?.rollup;
  const hasRollupLinux = packageJson.devDependencies?.['@rollup/rollup-linux-x64-gnu'];
  
  if (!hasRollup || !hasRollupLinux) {
    console.log('   ⚠️  Rollup ou dépendance Linux manquante, ajout en cours...');
    if (packageManager === 'yarn') {
      execSync('yarn add -D rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/rollup-linux-x64-gnu', 
        { stdio: 'inherit', cwd: projectRoot });
    } else {
      execSync('npm install -D rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/rollup-linux-x64-gnu', 
        { stdio: 'inherit', cwd: projectRoot });
    }
    console.log('   ✓ Rollup et dépendance Linux ajoutés');
  } else {
    console.log('   ✓ Rollup déjà présent');
  }

  // 5. Mise à jour des dépendances principales
  console.log('\n⬆️  Mise à jour de Vite et Rollup...');
  if (packageManager === 'yarn') {
    execSync('yarn upgrade vite rollup', { stdio: 'inherit', cwd: projectRoot });
  } else {
    execSync('npm update vite rollup', { stdio: 'inherit', cwd: projectRoot });
  }
  console.log('   ✓ Dépendances mises à jour');

  // 6. Reconstruction du projet
  console.log('\n🏗️  Reconstruction du projet...');
  if (packageManager === 'yarn') {
    execSync('yarn build', { stdio: 'inherit', cwd: projectRoot });
  } else {
    execSync('npm run build', { stdio: 'inherit', cwd: projectRoot });
  }
  console.log('   ✓ Build terminé');

  console.log('\n✅ Nettoyage et réinstallation terminés avec succès!');
  console.log('🚀 Votre projet est prêt pour le déploiement.\n');

} catch (error) {
  console.error('\n❌ Erreur lors du processus:', error.message);
  process.exit(1);
}

