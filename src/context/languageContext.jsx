import { createContext, useContext, useReducer, useState } from 'react';
import { useCookies } from 'react-cookie';

const LanguageContext = createContext();

const languageReducer = (state, action) => {
    switch (action.type) {
        case 'setLanguage':
            return action.payload;
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

const LanguageProvider = ({ children }) => {
    const [state, dispatch] = useReducer(languageReducer, 'kz');

    const [cookies, setCookie] = useCookies(['language']);

    const [language, setLanguage] = useState(cookies.language || 'kz');

    const value = { state, dispatch };

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
