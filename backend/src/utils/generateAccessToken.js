import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const generateAccessToken = async (userId)=>{
    const token = jwt.sign(
        {id:userId},
        process.env.SECRET_KEY_ACCESS,
        {expiresIn:'7d'}
    )

    return token;
}

export default generateAccessToken;