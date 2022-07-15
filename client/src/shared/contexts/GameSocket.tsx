import { createContext, useCallback, useState } from 'react';
import { services } from 'shared/services/services';
import { Socket } from 'socket.io-client';

interface IGameSocketContextData {
  socket: Socket | null;
  connect: () => void;
  disconnect: () => void;
}

interface IGameSocketProviderProps {
  children: React.ReactNode;
}

export const GameSocketContext = createContext<IGameSocketContextData>(
  {} as IGameSocketContextData
);

export const GameSocketProvider: React.FC<IGameSocketProviderProps> = ({
  children,
}) => {
  /* STATE */
  const [socket, setSocket] = useState<Socket | null>(null);

  /* LOGIC */
  const handleConnect = useCallback(() => {
    setSocket(services.gameSocket.connect());
  }, []);

  const handleDisconnect = useCallback(() => {
    services.gameSocket.disconnect();
    setSocket(null);
  }, []);

  /* PROVIDER */
  return (
    <GameSocketContext.Provider
      value={{
        socket: socket,
        connect: handleConnect,
        disconnect: handleDisconnect,
      }}
    >
      {children}
    </GameSocketContext.Provider>
  );
};
