import React, { useState, FormEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { LogIn, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginProps {
  onLoginSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const { login, loading } = useAuth();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login({ email, password });
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion. Vérifiez vos identifiants.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDark ? 'bg-slate-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`w-full max-w-md ${isDark ? 'bg-slate-800' : 'bg-white'} rounded-2xl shadow-2xl p-8`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${isDark ? 'bg-indigo-600' : 'bg-indigo-100'} mb-4`}>
            <LogIn className={`w-8 h-8 ${isDark ? 'text-white' : 'text-indigo-600'}`} />
          </div>
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Connexion
          </h1>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Accédez à votre tableau de bord
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Email
            </label>
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-400'}`} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  isDark
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
                placeholder="user@agence.tn"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div>
            <label htmlFor="password" className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Mot de passe
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-400'}`} />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  isDark
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
                placeholder="••••••••"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Erreur */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center gap-2 p-3 rounded-lg ${
                isDark ? 'bg-red-900/30 border border-red-700' : 'bg-red-50 border border-red-200'
              }`}
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </motion.div>
          )}

          {/* Bouton de connexion */}
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
              isDark ? 'focus:ring-offset-slate-800' : ''
            }`}
          >
            {isSubmitting || loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Connexion...</span>
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span>Se connecter</span>
              </>
            )}
          </button>
        </form>

        {/* Info de test */}
        <div className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} mb-2 font-medium`}>
            Comptes de test :
          </p>
          <div className={`text-xs space-y-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            <p><strong>Admin:</strong> admin@transbus.tn / admin123</p>
            <p><strong>Agence:</strong> agence@transbus.tn / agence123</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

