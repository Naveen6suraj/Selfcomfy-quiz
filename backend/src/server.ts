import http from 'http';
import app from './app';
import connectDB from './config/db';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import subjectRoutes from './routes/subjectRoutes';
import quizRoutes from './routes/quizRoutes';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/subjects', subjectRoutes);
app.use('/api/quizzes', quizRoutes);

// Connect to Database
connectDB();

const server = http.createServer(app);

// Initialize Socket.io (Will not work on Vercel, but safe to initialize)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Only listen locally, Vercel will handle requests directly to the exported app
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

export default app;
