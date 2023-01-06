import { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { decodeToken, isExpired } from 'react-jwt';
import { useNavigate } from 'react-router-dom';

import { login } from '../services/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies([
        'accessToken',
        'refreshToken',
        'user',
    ]);

    const [accessToken, setAccessToken] = useState(cookies.accessToken || null);
    const [refreshToken, setRefreshToken] = useState(
        cookies.refreshToken || null
    );
    const [user, setUser] = useState(cookies.user || null);

    const handleSignIn = async ({ email, password, rememberMe }) => {
        const { data } = await login({ email, password });

        const { accessToken, refreshToken } = data;

        const decodedToken = decodeToken(accessToken);

        const user = {
            lastName: decodedToken.user.lastName,
            firstName: decodedToken.user.firstName,
            fatherName: decodedToken.user.fatherName,
            email: decodedToken.user.email,
            phoneNumber: decodedToken.user.phoneNumber,
            role: decodedToken.role,
        };

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUser(user);

        const expirationInSeconds = rememberMe
            ? 30 * 24 * 60 * 60
            : 24 * 60 * 50;

        setCookie(
            'accessToken',
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
            'refreshToken',
            { refreshToken },
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
            { user },
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
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);

        removeCookie('accessToken');
        removeCookie('refreshToken');
        removeCookie('user');

        navigate('/');
    };

    const handleRefresh = () => {};

    const value = {
        user,
        accessToken,
        refreshToken,
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
