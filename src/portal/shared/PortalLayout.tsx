import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { postLogout } from './auth';

export function PortalLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await postLogout();
    logout();
    navigate('/portal/login', { replace: true });
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <img 
          src="/images/didactik-logo-1.svg" 
          alt="Didactik Media" 
          className="h-8 md:h-10" 
        />
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-gray-600">{user.email}</span>
          )}
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-primary transition-colors duration-200 ease-out"
          >
            Sign out
          </button>
        </div>
      </header>
      {user && (
        <div className="bg-white border-b border-gray-100 px-6 flex items-center gap-6">
          {user.role === 'production_company_user' && (
            <>
              <NavLink
                to="/portal/production/dashboard"
                className={({ isActive }) =>
                  `py-3 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${
                    isActive ? 'text-primary border-primary' : 'text-gray-500 border-transparent hover:text-primary'
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/portal/production/assets"
                className={({ isActive }) =>
                  `py-3 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${
                    isActive ? 'text-primary border-primary' : 'text-gray-500 border-transparent hover:text-primary'
                  }`
                }
              >
                Your Assets
              </NavLink>
              <NavLink
                to="/portal/production/submit"
                className={({ isActive }) =>
                  `py-3 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${
                    isActive ? 'text-primary border-primary' : 'text-gray-500 border-transparent hover:text-primary'
                  }`
                }
              >
                Submit New
              </NavLink>
            </>
          )}
          {user.role === 'broadcaster_user' && (
            <>
              <NavLink
                to="/portal/broadcaster/dashboard"
                className={({ isActive }) =>
                  `py-3 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${
                    isActive ? 'text-primary border-primary' : 'text-gray-500 border-transparent hover:text-primary'
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/portal/broadcaster/discover"
                className={({ isActive }) =>
                  `py-3 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${
                    isActive ? 'text-primary border-primary' : 'text-gray-500 border-transparent hover:text-primary'
                  }`
                }
              >
                Discover Content
              </NavLink>
            </>
          )}
        </div>
      )}
      <main className="flex-grow p-6">
        <Outlet />
      </main>
    </div>
  );
}
