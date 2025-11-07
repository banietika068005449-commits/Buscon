import React, { ReactNode, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import Login from './Login';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole,
  redirectTo 
}) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Redirection automatique après connexion
  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      // La redirection sera gérée par le composant parent (App.tsx)
    }
  }, [isAuthenticated, user, loading]);

  // Afficher un loader pendant la vérification
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Si non authentifié, afficher le formulaire de connexion
  if (!isAuthenticated) {
    return <Login />;
  }

  // Vérifier le rôle si requis
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Accès refusé</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
        </div>
      </div>
    );
  }

  // Afficher le contenu protégé
  return <>{children}</>;
};

export default ProtectedRoute;

