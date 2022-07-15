import { Server } from 'socket.io';
import http from 'http';

export const setGameSocketEvents = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });
  io.on('connection', socket => {
    console.log('user connected');
    socket.on('disconnect', () => console.log('user disconnected'));
  });
};
