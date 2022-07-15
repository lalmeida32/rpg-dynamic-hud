import { Server } from 'socket.io';
import http from 'http';
import { GameSocketService } from 'services/GameSocketService';

const gameSocketService = GameSocketService.getInstance();

export const setGameSocketEvents = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });
  io.on('connection', socket => {
    console.log('user connected');

    socket.on('dice', diceCap => {
      const result = gameSocketService.rollDice(diceCap);
      socket.emit('diceResult', result);
      socket.broadcast.emit('diceResult', result);
    });

    socket.on('disconnect', () => console.log('user disconnected'));
  });
};
