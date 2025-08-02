import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import __dirname from './utils.js'; // Import __dirname from utils.js

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import userRouter from './routes/user.routes.js';
import categoryRouter from './routes/category.routes.js';
import uploadRouter from './routes/upload.route.js';
import subCategoryRouter from './routes/subCategory.route.js';
import productRouter from './routes/product.route.js';

import './config/db.js';

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet({
  contentSecurityPolicy: false,
}));

// ✅ API Routes
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/file', uploadRouter);
app.use('/api/sub-category', subCategoryRouter);
app.use('/api/product', productRouter);

// ✅ Serve React frontend build (must be built)
// Serve static frontend
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Catch-all to serve React Router routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});


// ✅ Root API test route
app.get('/', (req, res) => {
  res.send('Backend server is up and running');
});

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Something went wrong',
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
