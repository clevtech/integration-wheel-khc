import { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';

const AgreementContext = createContext();

const AgreementProvider = ({ children }) => {
    const [cookies, setCookie] = useCookies(['isAgreed']);
    const [isAgreed, setIsAgreed] = useState(cookies.isAgreed || false);

    const handleAgreement = () => {
        setIsAgreed(true);

        setCookie('isAgreed', true, {
            path: '/',
            expires: new Date(Date.now() + 31536000000),
            maxAge: 31536000000,
            domain: 'localhost',
            secure: false,
            httpOnly: false,
            sameSite: 'lax',
        });
    };

    const value = { isAgreed, handleAgreement };

    return (
        <AgreementContext.Provider value={value}>
            {children}
        </AgreementContext.Provider>
    );
};

const useAgreement = () => {
    const context = useContext(AgreementContext);

    if (!context) {
        throw new Error(
            'useAgreement must be used within an AgreementProvider'
        );
    }

    return context;
};

export { AgreementProvider, useAgreement };
