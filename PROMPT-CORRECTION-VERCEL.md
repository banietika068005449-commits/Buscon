# 🚀 Prompt de Correction Build Vercel

## 📋 PROMPT À COPIER-COLLER

Copie ce prompt complet dans ChatGPT, Claude, ou tout autre IA :

---

```plaintext
Tu es un expert en déploiement Vercel avec Vite + Yarn + Node.js.

Voici le log d'erreur complet d'un build Vercel qui échoue :

```
[INSÉRER ICI LE LOG COMPLET QUE TU AS FOURNI]
```

L'erreur principale est :

```
Error: Cannot find module '@rollup/rollup-linux-x64-gnu'

npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828)

Please try `npm i` again after removing both package-lock.json and node_modules directory.
```

### OBJECTIF :

Corrige cette erreur **sans toucher au code source**, uniquement via :

- `package.json`
- `vercel.json` (si besoin)
- `.vercelignore`
- Commandes de build
- Variables d'environnement

### CONTRAINTES :

- Utilise **Yarn 1.x** (déjà en place)
- Projet avec **Vite** (`vite build`)
- Déploiement sur **Vercel**
- Node.js 22 est utilisé (Vercel)

### DEMANDE PRÉCISE :

1. Donne-moi **les modifications exactes** à faire dans :
   - `package.json`
   - `vercel.json` (si nécessaire)
   - `.yarnrc` ou autre

2. Explique **pourquoi** ça marche

3. Donne une **alternative avec `pnpm`** si Yarn persiste à échouer

4. Bonus : un **script de nettoyage local** pour reproduire et tester

Réponds en français, clair, structuré, avec des blocs de code prêts à copier.
```

---

## 💡 Comment utiliser ce prompt

1. **Récupère ton log d'erreur complet** depuis Vercel :
   - Va dans ton dashboard Vercel
   - Clique sur le build qui a échoué
   - Copie tout le log (de `Running build` jusqu'à `exit code 1`)

2. **Remplace** `[INSÉRER ICI LE LOG COMPLET QUE TU AS FOURNI]` par ton log

3. **Colle le prompt complet** dans ChatGPT, Claude, ou une autre IA

4. **Applique les corrections** suggérées

---

## 🔍 Exemple de log à copier

```
Running build in Washington, D.C., USA (US East) - iad1
Cloning github.com/user/repo...
Installing dependencies...
yarn install v1.22.19
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
Running "yarn run build"
vite v6.3.5 building for production...
Error: Cannot find module '@rollup/rollup-linux-x64-gnu'
...
```

---

## ✅ Résultat attendu

L'IA te donnera :

- ✅ Les modifications exactes dans `package.json`
- ✅ La configuration `vercel.json` si nécessaire
- ✅ Une explication claire du problème
- ✅ Une alternative avec pnpm
- ✅ Un script de test local

---

## 🎯 Astuce

**Colle exactement ton log complet** - plus il est détaillé, meilleure sera la correction !

