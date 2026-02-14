
import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();
  const isExplorerPage = location.pathname.startsWith('/visualizer');

  if (isExplorerPage) return null;

  return (
    // Replaced 'class' with 'className' for React standards
    <footer className="px-6 py-12 mx-auto w-full max-w-7xl border-t border-[#112120]/10 dark:border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 p-1 rounded text-primary">
            <span className="material-symbols-outlined">route</span>
          </div>
          <span className="font-bold text-[#112120] dark:text-white">TripRoute</span>
        </div>
        <div className="flex gap-8 text-sm font-medium text-[#112120]/50 dark:text-white/50">
          <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
          <a className="hover:text-primary transition-colors" href="#">Contact</a>
        </div>
        <div className="flex gap-4">
          <a className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all" href="#">
            <span className="material-symbols-outlined text-xl">share</span>
          </a>
          <a className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all" href="#">
            <span className="material-symbols-outlined text-xl">language</span>
          </a>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-[#112120]/40 dark:text-white/30">
        © 2024 TripRoute Visualizer. All rights reserved. Designed for explorers.
      </div>
    </footer>
  );
};

export default Footer;
