import { createContext, useCallback, useState } from 'react';
import { services } from 'shared/services/services';
import { Socket } from 'socket.io-client';

interface IGameSocketState {
  [key: string]: {
    socketId: string;
    name?: string;
    deadImage?: Uint8Array;
    lowImage?: Uint8Array;
    mediumImage?: Uint8Array;
    highImage?: Uint8Array;
    statusBars: { min: number; max: number }[];
    attributes: number[];
  };
}

interface IGameSocketContextData {
  socket: Socket | null;
  state: IGameSocketState | null;
  setState: (s: IGameSocketState | null) => void;
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
  const [state, setState] = useState<IGameSocketState | null>(null);

  /* LOGIC */
  const handleConnect = useCallback(() => {
    setSocket(services.gameSocket.connect());
  }, []);

  const handleDisconnect = useCallback(() => {
    services.gameSocket.disconnect();
    setSocket(null);
  }, []);

  const handleSetState = useCallback((s: IGameSocketState | null) => {
    setState(s);
  }, []);

  /* PROVIDER */
  return (
    <GameSocketContext.Provider
      value={{
        socket: socket,
        state: state,
        setState: handleSetState,
        connect: handleConnect,
        disconnect: handleDisconnect,
      }}
    >
      {children}
    </GameSocketContext.Provider>
  );
};
