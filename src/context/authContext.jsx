import { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useJwt } from 'react-jwt';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [cookies, setCookie, removeCookie] = useCookies(['tokens', 'user']);

    const [tokens, setTokens] = useState(cookies.tokens || {});
    const [user, setUser] = useState(cookies.user || {});

    const handleSignIn = ({ email, password }) => {
        // const { decodedToken, isExpired } = useJwt(token);
    };

    const handleSignUp = () => {
        setTokens({});
        setUser({});

        removeCookie('tokens');
        removeCookie('user');
    };

    const handleRefresh = () => {};

    const value = { user, tokens, handleSignIn, handleSignUp, handleRefresh };

    return (
        <AuthContext.Provider value={{ user, setUser, tokens, setTokens }}>
            {children}
        </AuthContext.Provider>
    );
}
