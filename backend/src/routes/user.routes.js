import {Router } from 'express'
const userRouter  = Router();
import {registerUser,verifyEmail,loginUser} from '../controller/user.controllers.js'


userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);



userRouter.post('/verify-email',verifyEmail)

export default userRouter;
