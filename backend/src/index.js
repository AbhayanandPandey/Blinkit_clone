import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import userRouter from './routes/user.routes.js';
import categoryRouter from './routes/category.routes.js';
import uploadRouter from './routes/upload.route.js';
import subCategoryRouter from './routes/subCategory.route.js';
import productRouter from './routes/product.route.js';

import './config/db.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL, // e.g., https://blinkyt-client.onrender.com
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
app.use(helmet({ contentSecurityPolicy: false }));

// API Routes only
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/file', uploadRouter);
app.use('/api/sub-category', subCategoryRouter);
app.use('/api/product', productRouter);

app.get('/', (req, res) => {
  res.send('Backend is running...');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Something went wrong',
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
