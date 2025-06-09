import {Router } from 'express'
const userRouter  = Router();
import {registerUser, verifyEmail, loginUser, logoutUser, updateAvatar, updateUserDetails, forgotPassword, verifyOtp, resetPas, refreshToken, getUserDetails} from '../controller/user.controllers.js'
import isAuthenticate from '../middleware/Auth.middleware.js';
import upload from '../middleware/multer.js';


userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/logout',isAuthenticate,logoutUser)
userRouter.put('/upload-avatar',isAuthenticate,upload.single('avatar'),updateAvatar) 
userRouter.put('/update-user',isAuthenticate,updateUserDetails)
userRouter.put('/forgot-password',forgotPassword)
userRouter.put('/forgot-password-otp',verifyOtp)
userRouter.put('/reset-password',resetPas)
userRouter.post('/refresh-token',refreshToken)
userRouter.get('/user-details',isAuthenticate,getUserDetails
)
userRouter.post('/verify-email',verifyEmail)

export default userRouter;
