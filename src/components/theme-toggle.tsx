import React from 'react';
import { Button } from "@heroui/react";
import { Icon } from '@iconify/react';
import { useTheme } from "@heroui/use-theme";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      isIconOnly
      variant="flat"
      aria-label="Toggle theme"
      className="bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-slate-200/80 dark:hover:bg-slate-700/80 interactive-scale"
      onPress={toggleTheme}
      radius="lg"
    >
      <Icon 
        icon={isDark ? "lucide:sun" : "lucide:moon"} 
        width={18} 
        height={18} 
        className={isDark ? 'text-amber-500' : 'text-slate-600'}
      />
    </Button>
  );
};