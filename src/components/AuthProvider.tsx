import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState } from 'react';
import { clearAuthState, getToken, saveAuthState } from '../utils/storage';

type AuthContextType = {
  isAuthenticated: boolean;
  loginWithContext(userData: Record<string, unknown>): void;
  logoutWithContext(): void;
};

// Correct usage of ReturnType with typeof
export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to log in a user
  const loginWithContext = (userData: Record<string, unknown>) => {
    saveAuthState(userData);
    const token = getToken();

    if (!token) {
      setIsAuthenticated(false);
    }

    const { exp } = jwtDecode(token);
    setIsAuthenticated(!!exp && exp * 1000 > new Date().getTime());
  };

  // Function to log out a user
  const logoutWithContext = () => {
    clearAuthState();
    setIsAuthenticated(false);
  };

  // Value to be provided by the context
  const authContextValue = {
    isAuthenticated,
    loginWithContext,
    logoutWithContext,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
