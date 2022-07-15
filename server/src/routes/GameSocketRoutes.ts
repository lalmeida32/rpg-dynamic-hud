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
    console.log('User connected', socket.id);
    socket.on('joinRoom', async ([token, room]) => {
      const result = await gameSocketService.joinRoom(token, room, socket.id);
      socket.emit('joinRoomResult', result);
      socket.broadcast.emit('joinRoomResult', result);
    });

    socket.on('rollDice', diceCap => {
      const result = gameSocketService.rollDice(diceCap);
      socket.emit('rollDiceResult', result);
      socket.broadcast.emit('rollDiceResult', result);
    });

    socket.on('disconnect', async () => {
      await gameSocketService.leaveRoom(socket.id);
      console.log('User disconnected', socket.id);
    });
  });
};
