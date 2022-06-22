import { createContext, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface IUserLoginContextData {
  username: string | null;
  token: string | null;
  login: (username: string, token: string) => void;
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
  /* STATE */
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  /* LOGIC */
  const handleLogin = useCallback((username: string, token: string) => {
    setToken(token);
    setUsername(username);
  }, []);

  const handleLogout = useCallback(() => {
    setToken(null);
    setUsername(null);
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

  /* PROVIDER */
  return (
    <UserLoginContext.Provider
      value={{
        token: token,
        username: username,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </UserLoginContext.Provider>
  );
};
