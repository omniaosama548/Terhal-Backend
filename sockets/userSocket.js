// sockets/userSocket.js
import jwt from 'jsonwebtoken';
import redisClient from '../lib/redisClient.js';

export const initUserSocket = (io) => {
  io.on('connection', async (socket) => {
    const token = socket.handshake.auth.token;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== 'traveler') {
        socket.disconnect(true);
        return;
      }

      const userId = decoded.id;
      await redisClient.sAdd('onlineUsers', userId);
      console.log(`Traveler ${userId} connected.`);

      socket.on('disconnect', async () => {
        await redisClient.sRem('onlineUsers', userId);
        console.log(`Traveler ${userId} disconnected.`);
      });

    } catch (err) {
      console.error('Socket auth error:', err);
      socket.disconnect(true);
    }
  });
};
