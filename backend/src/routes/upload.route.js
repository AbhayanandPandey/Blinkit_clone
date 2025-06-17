import {Router} from 'express';
import isAuthenticate from '../middleware/Auth.middleware.js';
import uploadImageController from '../controller/uploadimages.controller.js';
import upload from '../middleware/multer.js';
const uploadRouter = Router();

uploadRouter.post('/upload',isAuthenticate,upload.single("file"),uploadImageController);

export default uploadRouter;