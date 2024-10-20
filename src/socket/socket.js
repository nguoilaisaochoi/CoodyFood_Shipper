// socket.js
import socketIOClient from 'socket.io-client';

const host = 'https://apiproject-1dk4.onrender.com/';
let socket;

export const connectSocket = () => {
  socket = socketIOClient(host);
  socket.on('connect', () => {
    console.log('Đã kết nối với server socket:', socket.id);
  });

  socket.on('connect_error', error => {
    console.log('Kết nối socket không thành công:', error);
  });

  socket.on('disconnect', () => {
    console.log('Đã ngắt kết nối với server socket');
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
