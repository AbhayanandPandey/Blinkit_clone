import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
})

const uploadImageCloudinary = async(image)=>{
    const bfr = image?.buffer || Buffer.from(await image.arrayBuffer)

    const uploadImage = await new Promise((res,rej)=>{
        cloudinary.uploader.upload_stream({ folder:'blinkyt'}, (error,uploadRes)=>{
            return res(uploadRes)
        }).end(bfr)
    })

    return uploadImage;
}

export default uploadImageCloudinary;

