import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

interface SocketMessage {
  type: string;
  data: any;
}

interface SocketContextData {
  isConnected: boolean;
  friends: any[];
  send: (type: string, data: any) => void;
  lastMessage: SocketMessage | null;
  balance: number;
  socket: WebSocket | null;
}

const SocketContext = createContext<SocketContextData>({
  isConnected: false,
  friends: [],
  send: () => {},
  lastMessage: null,
  balance: 1000,
  socket: null
});

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: React.ReactNode;
  userId?: string;
  token?: string;
}

export const SocketProvider = ({ children, userId, token }: SocketProviderProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [friends, setFriends] = useState<any[]>([]);
  const [lastMessage, setLastMessage] = useState<SocketMessage | null>(null);
  const [balance, setBalance] = useState(1000);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // VPC Edge Server - Bun Native WebSocket
    const socket = new WebSocket('ws://localhost:3001');
    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
      console.log('🚀 Connected to VPC Edge Server');
      
      // Auto-register for session
      send('register', {
        username: 'NeonNinja',
        avatar: 'N',
        elo: 1850
      });
    };

    socket.onmessage = (event) => {
      try {
        const payload: SocketMessage = JSON.parse(event.data);
        const { type, data } = payload;
        
        setLastMessage(payload);

        // Core platform handlers
        switch (type) {
          case 'friends:update':
            setFriends(data);
            break;
          case 'game:result':
            if (data.newBalance !== undefined) {
              setBalance(data.newBalance);
            }
            break;
          case 'error':
            console.error('Socket Error:', data);
            break;
        }
      } catch (err) {
        console.error('Failed to parse socket message:', err);
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log('🔌 Disconnected from VPC Edge Server');
      // Attempt reconnect after 3s
      setTimeout(() => {
        // Re-call useEffect logic or just reload
      }, 3000);
    };

    return () => {
      socket.close();
    };
  }, []);

  const send = (type: string, data: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type, data }));
    }
  };

  return (
    <SocketContext.Provider value={{ isConnected, friends, send, lastMessage, balance, socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};

