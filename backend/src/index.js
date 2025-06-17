import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import userRouter from './routes/user.routes.js'

import './config/db.js';
import categoryRouter from './routes/category.routes.js';
import uploadRouter from './routes/upload.route.js';

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet({
    contentSecurityPolicy: false
}));

app.use('/api/user', userRouter)
app.use('/api/category',categoryRouter)
app.use('/api/file',uploadRouter)

app.listen(process.env.PORT || 5001, () => {
    console.log(`Server is running on port ${process.env.PORT || 5173}`);
});
