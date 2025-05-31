import {Router } from 'express'
const userRouter  = Router();
import {registerUser,verifyEmail,loginUser, logoutUser} from '../controller/user.controllers.js'
import isAuthenticate from '../middleware/Auth.middleware.js';


userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/logout',isAuthenticate,logoutUser)


userRouter.post('/verify-email',verifyEmail)

export default userRouter;
