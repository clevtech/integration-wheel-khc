import { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
    const [cookies, setCookie] = useCookies(['language']);

    const [language, setLanguage] = useState(cookies.language || 'kz');

    const handleLanguage = (language) => {
        setLanguage(language);

        setCookie('language', language, {
            path: '/',
            expires: new Date(Date.now() + 31536000000),
            maxAge: 31536000000,
            domain: 'localhost',
            secure: false,
            httpOnly: false,
            sameSite: 'lax',
        });
    };

    const value = { language, handleLanguage };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

const useLanguage = () => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }

    return context;
};

export { LanguageProvider, useLanguage };
