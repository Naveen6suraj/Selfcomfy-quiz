"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
dotenv_1.default.config();
const connectDB = async () => {
    try {
        let mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            console.log('No MONGODB_URI found, falling back to MongoMemoryServer...');
            // Start In-Memory MongoDB Server so it works without installing MongoDB!
            const mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
            mongoUri = mongoServer.getUri();
        }
        const conn = await mongoose_1.default.connect(mongoUri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`Error connecting to MongoDB: ${error instanceof Error ? error.message : error}`);
        process.exit(1);
    }
};
exports.default = connectDB;
