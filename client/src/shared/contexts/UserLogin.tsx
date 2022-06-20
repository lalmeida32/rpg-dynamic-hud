import { createContext, useCallback, useState } from 'react';

interface IUserLoginContextData {
  username: string;
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
  const [name, setName] = useState('');

  const handleLogout = useCallback(() => {
    setName('Lucas');
  }, []);

  return (
    <UserLoginContext.Provider
      value={{
        username: name,
        logout: handleLogout,
      }}
    >
      {children}
    </UserLoginContext.Provider>
  );
};
