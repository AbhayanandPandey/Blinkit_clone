import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

if(!process.env.MONGO_URI)
    {throw new error("MongoDB URI not found")}
mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

