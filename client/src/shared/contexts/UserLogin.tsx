import { createContext, useCallback, useState } from 'react';

interface IUserLoginContextData {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

interface IUserLoginProviderProps {
  children: React.ReactNode;
}

export const UserLoginContext = createContext<IUserLoginContextData>(
  {} as IUserLoginContextData
);

export const UserLoginProvider: React.FC<IUserLoginProviderProps> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = useCallback((token: string) => {
    setToken(token);
  }, []);

  const handleLogout = useCallback(() => {
    setToken(null);
  }, []);

  return (
    <UserLoginContext.Provider
      value={{
        token: token,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </UserLoginContext.Provider>
  );
};
