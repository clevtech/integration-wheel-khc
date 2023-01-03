import { createContext, useContext, useReducer, useState } from 'react';

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
