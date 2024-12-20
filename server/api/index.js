import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import connectDB from "../../config/mongodb.js";
import userRouter from "../../routes/userRoutes.js";
import imageRouter from "../../routes/imageRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
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

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ success: false, message: 'Database connection failed' });
  }
});

// Routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Root route
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.url} not found`
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Export the serverless handler
export const handler = serverless(app);