import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "../config/mongodb.js";
import userRouter from "../routes/userRoutes.js";
import imageRouter from "../routes/imageRoutes.js";

const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
let isConnected = false;
const connectToDatabase = async () => {
  if (isConnected) return;
  try {
    await connectDB();
    isConnected = true;
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Wrap the request handler
const handler = async (req, res) => {
  try {
    await connectToDatabase();

    // Routes
    if (req.url.startsWith('/api/user')) {
      return userRouter(req, res);
    }
    
    if (req.url.startsWith('/api/image')) {
      return imageRouter(req, res);
    }

    // Default route
    if (req.url === '/api' || req.url === '/') {
      return res.json({ status: 'ok', message: 'API is working' });
    }

    // 404 for unmatched routes
    res.status(404).json({ 
      success: false, 
      message: 'Route not found' 
    });

  } catch (error) {
    console.error('Request error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export default handler;

