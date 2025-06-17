import uploadImageCloudinary from "../utils/uploadimageCloudinary.js";

const uploadImageController =async (req,res)=>{
    try {
        const file = req.file;
        const uploadimg = await uploadImageCloudinary(file)
        return res.json({
            message:'Image Upload successfully',
            error:false,
            success:true,
            data:uploadimg
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message || 'Internal server error',
            success: false
        });
    }
}
export default uploadImageController;