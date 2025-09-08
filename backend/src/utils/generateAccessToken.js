import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateAccessToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_ACCESS,
    { expiresIn: '15d' }   // short expiry
  );
};

export default generateAccessToken;
