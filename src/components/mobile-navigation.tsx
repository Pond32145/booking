import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useTheme } from "@heroui/use-theme";
import { useLanguage } from '../contexts/language-context';

export const MobileNavigation: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const isActive = (path: string) => location.pathname === path;
  const isDark = theme === "dark";
  const [isNavigating, setIsNavigating] = React.useState(false);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };
  
  const handleNavigation = (path: string) => {
    if (location.pathname === path) return; // Don't navigate if already on the page
    
    setIsNavigating(true);
    
    // Force navigation with proper state management
    history.push(path);
    
    // Reset navigation state after a short delay
    setTimeout(() => {
      setIsNavigating(false);
      window.scrollTo(0, 0);
    }, 100);
  };

  const navItems = [
    { path: '/', icon: 'lucide:home', label: t.home },
    { path: '/my-bookings', icon: 'lucide:calendar', label: t.myBookings },
    { path: '/support', icon: 'lucide:help-circle', label: t.support },
    { path: '/profile', icon: 'lucide:user', label: t.profile },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-content1/90 backdrop-blur-xl shadow-2xl border-t border-slate-200/50 dark:border-slate-700/50 z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            disabled={isNavigating}
            className={`flex flex-col items-center justify-center flex-1 h-full py-2 px-1 transition-all duration-300 rounded-lg mx-0.5 ${
              isActive(item.path) 
                ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 scale-105' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary-500'
            } ${isNavigating ? 'opacity-50' : ''}`}
          >
            <div className={`transition-all duration-300 ${
              isActive(item.path) ? 'animate-float' : ''
            }`}>
              <Icon 
                icon={item.icon} 
                width={20} 
                height={20} 
                className={`transition-all duration-300 ${
                  isActive(item.path) ? 'text-primary-600 dark:text-primary-400 drop-shadow-sm' : ''
                }`}
              />
            </div>
            <span className={`text-xs mt-1 font-medium transition-all duration-300 ${
              isActive(item.path) ? 'text-primary-700 dark:text-primary-300' : ''
            }`}>
              {item.label}
            </span>
            {isActive(item.path) && (
              <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-primary rounded-full"></div>
            )}
          </button>
        ))}
        
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="flex flex-col items-center justify-center flex-1 h-full py-2 px-1 rounded-lg mx-0.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary-500"
          aria-label="Toggle theme"
        >
          <div>
            <Icon 
              icon={isDark ? "lucide:sun" : "lucide:moon"} 
              width={20} 
              height={20} 
              className={isDark ? 'text-amber-500' : 'text-slate-600'}
            />
          </div>
          <span className="text-xs mt-1 font-medium">
            {isDark ? 'Light' : 'Dark'}
          </span>
        </button>
      </div>
    </div>
  );
};