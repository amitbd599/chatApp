const express = require('express');
const router = require('./src/routes/api');
const app = new express();
const socketIo = require('socket.io');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const http = require('http');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotENV = require('dotenv');
dotENV.config();

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// let URL =
//   "mongodb+srv://<username>:<password>@cluster0.fsp0qs4.mongodb.net/e-commerce?retryWrites=true&w=majority";
// let option = { user: "admin", pass: "admin@123", autoIndex: true };
mongoose
  .connect('mongodb://localhost:27017/chatApp')
  .then((res) => {
    console.log('Database Connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

app.use('/api/v1', router);

module.exports = app;
