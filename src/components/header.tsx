import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@heroui/react";
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { ThemeToggle } from './theme-toggle';
import { useAuth } from '../contexts/auth-context';
import { LoginModal } from './login-modal';
import { useLanguage } from '../contexts/language-context';

export const Header: React.FC = () => {
  const location = useLocation();
  const [loginModalOpen, setLoginModalOpen] = React.useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Navbar 
      maxWidth="xl" 
      className="modern-card shadow-lg bg-white/80 dark:bg-content1/80 backdrop-blur-xl border-0 border-b border-slate-200/50 dark:border-white/10 hidden md:flex"
      classNames={{
        wrapper: "px-6"
      }}
    >
      <NavbarBrand>
        <RouterLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <Icon icon="lucide:calendar" width={20} height={20} className="text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="font-bold text-xl gradient-text-primary">BookEase</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 -mt-1">Smart Booking</p>
          </div>
        </RouterLink>
      </NavbarBrand>
      
      <NavbarContent className="hidden md:flex gap-8" justify="center">
        <NavbarItem isActive={isActive('/')}>
          <Link 
            as={RouterLink} 
            to="/" 
            color={isActive('/') ? 'primary' : 'foreground'} 
            className={`font-medium px-3 py-2 rounded-lg transition-all duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/20 ${
              isActive('/') ? 'bg-primary-50 dark:bg-primary-900/30' : ''
            }`}
          >
            {t.home}
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isActive('/my-bookings')}>
          <Link 
            as={RouterLink} 
            to="/my-bookings" 
            color={isActive('/my-bookings') ? 'primary' : 'foreground'} 
            className={`font-medium px-3 py-2 rounded-lg transition-all duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/20 ${
              isActive('/my-bookings') ? 'bg-primary-50 dark:bg-primary-900/30' : ''
            }`}
          >
            {t.myBookings}
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isActive('/support')}>
          <Link 
            as={RouterLink} 
            to="/support" 
            color={isActive('/support') ? 'primary' : 'foreground'} 
            className={`font-medium px-3 py-2 rounded-lg transition-all duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/20 ${
              isActive('/support') ? 'bg-primary-50 dark:bg-primary-900/30' : ''
            }`}
          >
            {t.support}
          </Link>
        </NavbarItem>
      </NavbarContent>
      
      <NavbarContent justify="end" className="gap-4">
        <NavbarItem className="hidden sm:flex">
          <ThemeToggle />
        </NavbarItem>
        
        <NavbarItem className="hidden sm:flex">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button 
                variant="flat" 
                isIconOnly 
                aria-label="Language"
                className="bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-all duration-200"
              >
                <Icon icon="lucide:globe" width={18} height={18} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Language options"
              onAction={(key) => setLanguage(key as 'en' | 'th')}
              selectedKeys={new Set([language])}
              selectionMode="single"
              className="modern-card"
            >
              <DropdownItem key="en" startContent={<Icon icon="lucide:check" className={`text-primary ${language === 'en' ? 'opacity-100' : 'opacity-0'}`} />}>
                English
              </DropdownItem>
              <DropdownItem key="th" startContent={<Icon icon="lucide:check" className={`text-primary ${language === 'th' ? 'opacity-100' : 'opacity-0'}`} />}>
                ไทย
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        
        <NavbarItem>
          {isAuthenticated ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-all duration-300 hover:scale-105 ring-2 ring-primary-200 dark:ring-primary-800"
                  color="primary"
                  name={user?.name || "สมชาย ใจดี"}
                  size="sm"
                  src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&auto=format"}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat" className="modern-card">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">{t.signedInAs}</p>
                  <p className="font-semibold">{user?.email || "somchai@example.com"}</p>
                </DropdownItem>
                <DropdownItem key="settings">
                  <RouterLink to="/profile" className="w-full block">
                    {t.profileSettings}
                  </RouterLink>
                </DropdownItem>
                <DropdownItem key="help">
                  <RouterLink to="/support" className="w-full block">
                    {t.helpSupport}
                  </RouterLink>
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onPress={logout}>
                  {t.logout}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button 
              color="primary" 
              variant="solid" 
              onPress={() => setLoginModalOpen(true)}
              className="font-medium button-glow interactive-scale bg-gradient-primary hover:shadow-lg transition-all duration-300"
              startContent={<Icon icon="lucide:log-in" width={18} height={18} />}
            >
              {t.login}
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
      
      <LoginModal isOpen={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </Navbar>
  );
};