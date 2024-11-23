// socket.js
import socketIOClient from 'socket.io-client';

/*
--- 'http://192.168.1.199:9999'
--- 'https://apiproject-1dk4.onrender.com' --binh
--- 'https://apiproject-ylai.onrender.com' --hung
*/
const host = 'https://apiproject-ylai.onrender.com';

let socket;

export const connectSocket = () => {
  socket = socketIOClient(host);
  socket.on('connect', () => {
    console.log('[Socket___Đã kết nối]', socket.id);
  });

  socket.on('connect_error', error => {
    console.log('[Socket___lỗi kết nối]', error);
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

export const getSocket = () => {
  return socket;
};

