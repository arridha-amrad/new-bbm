import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Socket } from "socket.io-client";

interface Context {
  socket: Socket | null;
  setSocket: Dispatch<SetStateAction<Socket | null>>;
}

export const SocketContext = createContext<Context>({
  setSocket: () => {},
  socket: null,
});

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  return (
    <SocketContext.Provider value={{ setSocket, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("Please wrap your app inside SocketProvider");
  }
  return socket;
};
