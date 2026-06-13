"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const subjectRoutes_1 = __importDefault(require("./routes/subjectRoutes"));
const quizRoutes_1 = __importDefault(require("./routes/quizRoutes"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
// Routes
app_1.default.use('/api/subjects', subjectRoutes_1.default);
app_1.default.use('/api/quizzes', quizRoutes_1.default);
// Connect to Database
(0, db_1.default)();
const server = http_1.default.createServer(app_1.default);
// Initialize Socket.io (Will not work on Vercel, but safe to initialize)
const io = new socket_io_1.Server(server, {
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
exports.default = app_1.default;
