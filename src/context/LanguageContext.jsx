import React, { createContext, useContext, useState, useEffect } from 'react';

export const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' }
];

const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      const lang = languages.find(l => l.code === savedLang);
      return lang || languages[0];
    }
    return languages[0];
  });

  const setLanguage = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language.code);
    document.documentElement.lang = language.code;
  };

  // Simple translation function - in a real app, this would use i18n
  const translate = (key) => {
    // Placeholder: implement real translation logic
    return key;
  };

  useEffect(() => {
    document.documentElement.lang = currentLanguage.code;
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, languages, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
