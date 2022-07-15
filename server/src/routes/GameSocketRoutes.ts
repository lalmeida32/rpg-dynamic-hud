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
      try {
        const result = await gameSocketService.joinRoom(token, room, socket.id);
        socket.emit('joinRoomResult', result);
        socket.broadcast.emit('joinRoomResult', result);
        // eslint-disable-next-line no-empty
      } catch (_) {}
    });

    socket.on('rollDice', diceCap => {
      try {
        const result = gameSocketService.rollDice(diceCap);
        socket.emit('rollDiceResult', result);
        socket.broadcast.emit('rollDiceResult', result);
        // eslint-disable-next-line no-empty
      } catch (_) {}
    });

    socket.on('disconnect', async () => {
      try {
        socket.broadcast.emit(
          'disconnectResult',
          await gameSocketService.leaveRoom(socket.id)
        );
        // eslint-disable-next-line no-empty
      } catch (_) {}
      console.log('User disconnected', socket.id);
    });
  });
};
