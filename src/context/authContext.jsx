import { createContext, useState } from 'react';

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const [tokens, setTokens] = useState({});

    return (
        <AuthContext.Provider value={{ user, setUser, tokens, setTokens }}>
            {children}
        </AuthContext.Provider>
    );
}
