import { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useJwt } from 'react-jwt';

import { login } from '../services/authApi';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['tokens', 'user']);

    const [tokens, setTokens] = useState(cookies.tokens || {});
    const [user, setUser] = useState(cookies.user || {});

    const handleSignIn = ({ email, password, rememberMe }) => {
        login({ email, password }).then((response) => {
            const { data } = response;

            const { accessToken } = data;

            const { decodedToken } = useJwt(accessToken);

            const { name } = decodedToken;

            const expirationInSeconds = rememberMe ? 31536000000 : 3600000;

            setTokens({ accessToken, refreshToken });
            setUser({ name });

            setCookie(
                'tokens',
                { accessToken },
                {
                    path: '/',
                    expires: new Date(Date.now() + expirationInSeconds),
                    maxAge: expirationInSeconds,
                    domain: 'localhost',
                    secure: false,
                    httpOnly: false,
                    sameSite: 'lax',
                }
            );
            setCookie(
                'user',
                { name },
                {
                    path: '/',
                    expires: new Date(Date.now() + expirationInSeconds),
                    maxAge: expirationInSeconds,
                    domain: 'localhost',
                    secure: false,
                    httpOnly: false,
                    sameSite: 'lax',
                }
            );
        });
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
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }

    return context;
};

export { AuthProvider, useAuth };
