import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB before routes
const startServer = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected successfully');
    
    // Routes
    app.use('/api/user', userRouter);
    app.use('/api/image', imageRouter);

    // Basic route for testing
    app.get('/', (req, res) => {
      res.json({ status: 'ok', message: 'Server is running' });
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error('Error:', err);
      res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === 'development' 
          ? err.message 
          : 'Internal server error'
      });
    });

    // 404 handler
    app.use((req, res) => {
      res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log('Server running on port ' + PORT));
}

export default app;

