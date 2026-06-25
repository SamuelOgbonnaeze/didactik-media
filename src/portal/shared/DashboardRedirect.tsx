import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function DashboardRedirect() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/portal/login" replace />;

  if (user.role === 'broadcaster_user') {
    return <Navigate to="/portal/broadcaster/dashboard" replace />;
  }
  if (user.role === 'production_company_user') {
    return <Navigate to="/portal/production/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-alt px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Admin Access Required</h2>
        <p className="text-sm text-gray-500 mb-6">
          Staff and administrators must use the Django admin backend to manage content.
        </p>
        <a 
          href={import.meta.env.DEV ? 'http://localhost:8000/admin/' : '/admin/'}
          className="cta-button inline-flex w-full justify-center border-none outline-none text-sm py-3"
        >
          Go to Admin Dashboard
        </a>
      </div>
    </div>
  );
}
