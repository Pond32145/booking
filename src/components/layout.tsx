import React from 'react';
import { Header } from './header';
import { MobileNavigation } from './mobile-navigation';
import { useTheme } from "@heroui/use-theme";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""} bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:bg-gradient-to-br dark:from-background dark:via-content1/50 dark:to-content2/30 flex flex-col transition-colors duration-500`}>
      <div className="fixed inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-indigo-400/5 dark:from-blue-600/10 dark:to-purple-600/10 pointer-events-none" />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 max-w-7xl relative z-10">
        {children}
      </main>
      <MobileNavigation />
    </div>
  );
};