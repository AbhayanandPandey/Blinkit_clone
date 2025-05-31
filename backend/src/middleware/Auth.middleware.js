import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
const isAuthenticate = (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req?.header?.authorization?.split(' ')[1]
        if (!token) {
            return res.status(500).json({
                message: 'invalid token',
                error: true,
                success: false
            })
        }
        const decode = jwt.verify(token,process.env.SECRET_KEY_ACCESS)
        if(!decode){
            return res.status(401).json({
                message: 'unauthorize access',
                error: true,
                success: false
            })
        }
        req.userId = decode.id;
        next();
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
export default isAuthenticate