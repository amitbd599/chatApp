const express = require('express');
const router = require('./src/routes/api');
const app = new express();
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

app.use(
  cors({
    credentials: true,
    origin: process.env.Origin_HOST,
  }),
);

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.Origin_HOST); // Replace with your Netlify URL
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
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

let URL =
  'mongodb+srv://<username>:<password>@cluster0.fsp0qs4.mongodb.net/chat_app?retryWrites=true&w=majority';
let option = {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  autoIndex: true,
};
mongoose
  .connect(URL, option)
  .then((res) => {
    console.log('Database Connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cookieParser());

app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 1000 });
app.use(limiter);

app.use('/api/v1', router);

module.exports = server;
