import { createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import jwtDecode from 'jwt-decode';

import { auth as authApi } from '../services/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['tokens', 'user']);

  const [tokens, setTokens] = useState(cookies.tokens || null);
  const [user, setUser] = useState(cookies.user || null);

  const handleSignOut = () => {
    setTokens(null);
    setUser(null);

    removeCookie('tokens');
    removeCookie('user');

    navigate('/');
  };

  const handleProfileUpdate = (user) => {
    const expirationInSeconds = 30 * 24 * 60 * 60;

    setCookie(
      'user',
      {
        ...user,
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
  };

  const handleRefresh = async () => {
    const response = await authApi.refresh({ refreshToken: tokens.refreshToken });

    console.log(response);

    const { data } = response;

    const { accessToken, refreshToken } = data;

    if (response.status === 200) {
      setTokens({ accessToken, refreshToken });

      setCookie(
        'tokens',
        { accessToken, refreshToken },
        {
          path: '/',
          expires: new Date(Date.now() + 30 * 24 * 60 * 60),
          maxAge: 30 * 24 * 60 * 60,
          domain: 'localhost',
          secure: false,
          httpOnly: false,
          sameSite: 'lax',
        }
      );
    } else {
      handleSignOut();
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (tokens) {
        handleRefresh();
      }
    }, 55 * 60 * 1000);

    return () => clearInterval(interval);
  }, [tokens]);

  const value = {
    user,
    tokens,
    setUser,
    setTokens,
    handleSignOut,
    handleProfileUpdate,
    handleRefresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
