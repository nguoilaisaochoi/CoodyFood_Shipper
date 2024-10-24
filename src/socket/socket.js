// socket.js
import socketIOClient from 'socket.io-client';

const host = 'https://apiproject-1dk4.onrender.com/';
let socket;

export const connectSocket = () => {
  socket = socketIOClient(host);
  socket.on('connect', () => {
    console.log('[Socket___Đã kết nối]', socket.id);
  });

  socket.on('connect_error', error => {
    console.log('[Socket___chưa kết nối]', error);
  });

  socket.on('disconnect', () => {
    console.log('[Socket___ngắt kết nối]');
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
