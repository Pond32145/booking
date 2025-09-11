import React, { createContext, useContext, useState, useEffect } from 'react';
import { thTranslations, enTranslations, TranslationKeys } from '../data/translations';

type LanguageContextType = {
  language: 'en' | 'th';
  setLanguage: (lang: 'en' | 'th') => void;
  t: TranslationKeys;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'th'>('th');
  
  // Load language preference from localStorage
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as 'en' | 'th' | null;
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);
  
  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  
  // Get translations based on current language
  const t = language === 'en' ? enTranslations : thTranslations;
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};