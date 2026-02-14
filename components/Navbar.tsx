
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated: boolean;
  onSignOut: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onSignOut }) => {
  const location = useLocation();
  const isExplorerPage = location.pathname.startsWith('/visualizer');

  if (isExplorerPage) return null; // Specialized header in explorer

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 mx-auto w-full max-w-7xl bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#112120]/5 dark:border-white/5">
      <Link to="/" className="flex items-center gap-2 group cursor-pointer">
        <div className="bg-primary p-1.5 rounded-lg text-[#112120]">
          <span className="material-symbols-outlined block">route</span>
        </div>
        <span className="text-xl font-bold tracking-tight text-[#112120] dark:text-white">TripRoute</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className={`text-sm font-semibold transition-colors ${location.pathname === '/' ? 'text-primary' : 'text-[#112120]/70 dark:text-white/70 hover:text-primary'}`}>Home</Link>
        <Link to="/about" className={`text-sm font-semibold transition-colors ${location.pathname === '/about' ? 'text-primary' : 'text-[#112120]/70 dark:text-white/70 hover:text-primary'}`}>About</Link>
        <Link to="/explore" className={`text-sm font-semibold transition-colors ${location.pathname === '/explore' ? 'text-primary' : 'text-[#112120]/70 dark:text-white/70 hover:text-primary'}`}>Routes</Link>
        <Link to="/pricing" className={`text-sm font-semibold transition-colors ${location.pathname === '/pricing' ? 'text-primary' : 'text-[#112120]/70 dark:text-white/70 hover:text-primary'}`}>Pricing</Link>
        <Link to="/contact" className={`text-sm font-semibold transition-colors ${location.pathname === '/contact' ? 'text-primary' : 'text-[#112120]/70 dark:text-white/70 hover:text-primary'}`}>Support</Link>
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="relative group">
              <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden transition-transform group-hover:scale-110">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcpL_UXL-TJZ6WEpP_gFBRpbpx6lxYYmmiRMdavM4zPJwcQrF2ZoSdE8WF01-Jhpu9cnqbT5-CI8La2McSEjcT8PQrEyLiPGAPv7p-vckKez9TvT6rMIh3NgIxVyBE5Kgfi__DdIH6W8piiuzw24PStiXhI3XK2zIvvJcljesx1XlQdb_X7K9K4qQPvlKGqNxaCmoHR_VVsEeSDpbr8QqJ5mMSYSxkypaHaOKyOYp21didjL0D5Eqxtxt1jkMxK52vvr1Kd6azp6By" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
            </Link>
            <button onClick={onSignOut} className="px-5 py-2.5 bg-background-light dark:bg-white/5 border border-neutral-soft dark:border-white/10 text-[#112120] dark:text-white rounded-lg text-sm font-bold hover:bg-red-50 hover:text-red-600 transition-all">Sign Out</button>
          </div>
        ) : (
          <>
            <Link to="/signin" className="px-5 py-2 text-sm font-bold text-[#112120] hover:text-primary transition-colors dark:text-white">Sign In</Link>
            <Link to="/signin" className="px-5 py-2.5 bg-primary text-[#112120] rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
