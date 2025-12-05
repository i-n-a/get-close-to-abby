// // through http local dev server and local development in client (react + vite)
// const http = require('http');
// const express = require('express');
// const { Server } = require('socket.io');
// const { SerialPort } = require('serialport');
// const { ReadlineParser } = require('@serialport/parser-readline');

// const app = express();
// const server = http.createServer(app); // 🧠 force plain HTTP
// const io = new Server(server, {
//   cors: { origin: '*' }
// });

// const port = 3001;

// app.use(express.static('public'));

// server.listen(port, () => {
//   console.log(`HTTP server listening on port ${port}`);
// });

// io.on('connection', (socket) => {
//   console.log('Client connected');
// });

// const serialPort = new SerialPort({
//   path: '/dev/cu.usbmodem2101',
//   baudRate: 9600,
// });
// const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// parser.on('data', (data) => {
//   console.log('From Arduino:', data);
//   if (data.trim() === 'pressed') {
//     io.emit('button_pressed');
//   }
// });

// through https local dev server and local development in client (react + vite)
require('dotenv').config();
const isDevelopment = process.env.NODE_ENV === 'development';
const express = require('express');
const fs = require('fs');
const httpModule = isDevelopment ? require('https') : require('http');

const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const { Server } = require('socket.io'); // 👈 socket.io

const app = express();
const port = process.env.PORT || 3001;

let options = {};
if (isDevelopment) {
  options = {
    key: fs.readFileSync('./localhost.key'),
    cert: fs.readFileSync('./localhost.crt'),
  };
}

const server = httpModule.createServer(options, app);
const io = new Server(server, {
  cors: {
    origin: '*', // loosen if needed
  },
});

app.use(express.static('public'));

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Handle client connection
io.on('connection', (socket) => {
  console.log('Socket.IO client connected');
});

// Serial connection with Arduino
const serialPort = new SerialPort({
  path: '/dev/tty.usbmodem2101', // adjust for your port
  baudRate: 9600,
});
const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('data', (data) => {
  console.log('Arduino says:', data);
  if (data.trim() === 'pressed') {
    io.emit('button_pressed'); // 👈 broadcast to frontend
  }
});
