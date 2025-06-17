const uploadImageController = (req,res)=>{
    try {
        const file = req.file;
        console.log(file);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message || 'Internal server error',
            success: false
        });
    }
}
export default uploadImageController;