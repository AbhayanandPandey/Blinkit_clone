import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import UserModel from '../model/user.model.js'
dotenv.config()

const generateRefreshToken = async (userId)=>{
    const token = jwt.sign(
            {id:userId},
            process.env.SECRET_KEY_REFRESH,
            {expiresIn:'7d'}
        )

        const updateRefreshToken = await UserModel.updateOne(
            {_id:userId},
            {refresh_token:token}
        )
    
        return token;
}

export default generateRefreshToken;