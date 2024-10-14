// socket.js
import socketIOClient from 'socket.io-client';

const host = 'https://apiproject-ylai.onrender.com/';
let socket;

export const connectSocket = onDisconnect => {
  socket = socketIOClient(host);

  socket.on('connect', () => {
    console.log('Đã kết nối với server:', socket.id);
  });

  socket.on('connect_error', error => {
    console.error('Kết nối không thành công:', error);
  });

  socket.on('disconnect', () => {
    console.log('Đã ngắt kết nối với server');

  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};
/*
export const getSocket = () => {
  return socket;
};
*/