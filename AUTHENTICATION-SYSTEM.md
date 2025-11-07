# 🔐 Système d'Authentification Unifié

## 📋 Vue d'ensemble

Système d'authentification complet avec gestion des rôles (Admin, Agence), redirection automatique, et filtrage des données selon les permissions.

## 🏗️ Architecture

```
┌─────────────────┐
│   Login Page    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  AuthContext    │ ← Gère l'état d'authentification
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ ProtectedRoute  │ ← Vérifie l'authentification et le rôle
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌────────┐
│ Admin  │ │ Agence │
│Dashboard│ │Dashboard│
└────────┘ └────────┘
```

## 🔑 Fonctionnalités

### 1. **Authentification**
- ✅ Formulaire de connexion avec validation
- ✅ Gestion des erreurs
- ✅ Stockage du token JWT dans localStorage
- ✅ Mock API pour le développement

### 2. **Gestion des Rôles**
- ✅ **Admin** : Accès à toutes les agences
- ✅ **Agence** : Accès uniquement à ses propres données
- ✅ **Chauffeur** : (prévu pour le futur)

### 3. **Redirection Automatique**
- ✅ Après connexion → Redirection selon le rôle
- ✅ Protection des routes sensibles
- ✅ Déconnexion automatique si non authentifié

### 4. **Filtrage Automatique**
- ✅ Les données sont filtrées selon `agence_id` pour les agences
- ✅ Les admins voient toutes les données

## 📁 Structure des Fichiers

```
src/
├── components/
│   └── auth/
│       ├── Login.tsx              # Composant de connexion
│       └── ProtectedRoute.tsx     # Route protégée
├── contexts/
│   └── AuthContext.tsx           # Context d'authentification
├── services/
│   ├── api.ts                     # Service API avec intercepteurs
│   └── mockApi.ts                 # Mock API pour développement
└── types/
    └── index.ts                   # Types d'authentification
```

## 🚀 Utilisation

### Connexion

```tsx
import { useAuth } from './contexts/AuthContext';

const { login, user, isAuthenticated } = useAuth();

// Connexion
await login({ email: 'admin@transbus.tn', password: 'admin123' });
```

### Protection de Route

```tsx
import ProtectedRoute from './components/auth/ProtectedRoute';

<ProtectedRoute requiredRole="admin">
  <AdminDashboard />
</ProtectedRoute>
```

### Vérification du Rôle

```tsx
const { hasRole, user } = useAuth();

if (hasRole('admin')) {
  // Code admin
}
```

## 🔐 Comptes de Test

### Admin
- **Email** : `admin@transbus.tn`
- **Mot de passe** : `admin123`
- **Rôle** : `admin`
- **Accès** : Toutes les agences

### Agence
- **Email** : `agence@transbus.tn`
- **Mot de passe** : `agence123`
- **Rôle** : `agence`
- **Agence ID** : `5`
- **Accès** : Uniquement les données de l'agence 5

## 🔄 Flux d'Authentification

1. **Utilisateur saisit email/mot de passe**
2. **Appel API** → `POST /api/auth/login`
3. **Réponse** → Token JWT + User info
4. **Stockage** → localStorage (token + user)
5. **Redirection** → Selon le rôle :
   - `admin` → `/dashboard/admin`
   - `agence` → `/dashboard/agence`

## 🛡️ Sécurité

### Token JWT
- Stocké dans `localStorage`
- Ajouté automatiquement dans les headers via intercepteur Axios
- Format : `Bearer {token}`

### Intercepteurs Axios
- **Request** : Ajoute le token à chaque requête
- **Response** : Gère les erreurs 401 (déconnexion automatique)

### Protection des Routes
- Vérification de l'authentification
- Vérification du rôle si requis
- Redirection vers login si non autorisé

## 📡 API Service

### Endpoints

| Endpoint | Méthode | Rôle requis | Description |
|----------|---------|-------------|-------------|
| `/auth/login` | POST | - | Connexion |
| `/bus` | GET | admin, agence | Liste des bus (filtrée) |
| `/agences` | GET | admin | Liste des agences |
| `/pickup-points` | GET | admin, agence | Points de ramassage (filtrés) |

### Filtrage Automatique

```typescript
// Pour les agences
GET /api/bus → WHERE agence_id = user.agence_id

// Pour les admins
GET /api/bus → Tous les bus
```

## 🎨 Composants

### Login
- Formulaire avec validation
- Gestion des erreurs
- Design responsive
- Support dark mode

### ProtectedRoute
- Vérification de l'authentification
- Vérification du rôle
- Redirection automatique

### Headers (Dashboard)
- Affichage de l'utilisateur connecté
- Menu déroulant avec déconnexion
- Informations de l'agence (si applicable)

## 🔧 Configuration

### Variables d'Environnement

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Si non définie, utilise le mock API en développement.

## 📝 Exemple d'Intégration

```tsx
// App.tsx
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard/admin" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/agence" 
          element={
            <ProtectedRoute requiredRole="agence">
              <AgencyDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AuthProvider>
  );
}
```

## 🚨 Gestion des Erreurs

- **401 Unauthorized** → Déconnexion automatique
- **403 Forbidden** → Message d'accès refusé
- **Erreur réseau** → Message d'erreur générique

## 🔄 Déconnexion

```tsx
const { logout } = useAuth();

// Déconnexion
logout(); // Supprime token et user du localStorage
```

## 📚 Prochaines Étapes

- [ ] Implémenter le refresh token
- [ ] Ajouter la gestion des sessions
- [ ] Implémenter "Se souvenir de moi"
- [ ] Ajouter la réinitialisation de mot de passe
- [ ] Ajouter la gestion des permissions granulaires

---

**✅ Système d'authentification prêt à l'emploi !**

