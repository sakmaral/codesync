import dotenv from 'dotenv';
import express, { Express } from 'express';
const cors = require('cors');

const http = require('http');
const { Server } = require('socket.io');

dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

const app: Express = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const port = process.env.PORT || 3000;

io.on('connection', (socket: typeof Server) => {
  console.log(`Socket ${socket.id} connected`);
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
