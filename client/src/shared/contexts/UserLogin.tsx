import { createContext, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = useCallback((token: string) => {
    setToken(token);
  }, []);

  const handleLogout = useCallback(() => {
    setToken(null);
  }, []);

  useEffect(() => {
    if (
      token === null &&
      (location.pathname.startsWith('/room') ||
        location.pathname.startsWith('/rooms'))
    )
      navigate('/auth');
    else if (token !== null && location.pathname.startsWith('/auth'))
      navigate('/rooms');
  }, [token, location, navigate]);

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
