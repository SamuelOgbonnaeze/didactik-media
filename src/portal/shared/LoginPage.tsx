import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin, decodeToken } from './auth';
import { useAuth } from './AuthContext';
import { motion } from 'framer-motion';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const token = await postLogin(username, password);
      login(token);
      const payload = decodeToken(token);
      if (payload.role === 'broadcaster_user') {
        navigate('/portal/broadcaster/dashboard', { replace: true });
      } else if (payload.role === 'production_company_user') {
        navigate('/portal/production/dashboard', { replace: true });
      } else {
        navigate('/portal', { replace: true });
      }
    } catch {
      setError('Invalid username or password.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-alt px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8"
      >
        <div className="mb-8 text-center flex flex-col items-center">
          <img 
            src="/images/didactik-logo-1.svg" 
            alt="Didactik Media" 
            className="h-10 mb-2" 
          />
          <p className="mt-1 text-sm text-gray-500">Sign in to your portal</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-200"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="cta-button w-full border-none outline-none disabled:opacity-60 text-sm py-3"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          <div className="mt-6">
            <a
              href={import.meta.env.DEV ? 'http://localhost:8000/admin/' : '/admin/'}
              className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all duration-200"
            >
              Sign in as Admin
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
