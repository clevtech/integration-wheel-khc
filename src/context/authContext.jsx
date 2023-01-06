import { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { decodeToken, isExpired } from 'react-jwt';
import { useNavigate } from 'react-router-dom';

import { auth } from '../services/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies(['tokens', 'user']);

    const [tokens, setTokens] = useState(cookies.tokens || null);
    const [user, setUser] = useState(cookies.user || null);

    const handleSignIn = async ({ email, password, rememberMe }) => {
        const { data } = await auth.login({ email, password });

        const { accessToken, refreshToken } = data;

        const decodedToken = decodeToken(accessToken);

        const userData = {
            lastName: decodedToken.user.lastName,
            firstName: decodedToken.user.firstName,
            fatherName: decodedToken.user.fatherName,
            email: decodedToken.user.email,
            phoneNumber: decodedToken.user.phoneNumber,
            role: decodedToken.role,
        };

        setTokens({ accessToken, refreshToken });
        setUser({ ...userData });

        const expirationInSeconds = rememberMe
            ? 30 * 24 * 60 * 60
            : 24 * 60 * 50;

        setCookie(
            'tokens',
            { accessToken, refreshToken },
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
            {
                ...userData,
            },
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

        navigate('/services');
    };

    const handleSignOut = () => {
        setTokens(null);
        setUser(null);

        removeCookie('tokens');
        removeCookie('user');

        navigate('/');
    };

    const handleRefresh = () => {};

    const value = {
        user,
        tokens,
        handleSignIn,
        handleSignOut,
        handleRefresh,
    };

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
