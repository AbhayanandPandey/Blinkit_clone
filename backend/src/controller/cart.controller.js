import CartProductModel from '../model/cartproduct.model.js'
import UserModel from '../model/user.model.js'

export const addToCart = async (req, res) => {
    try {
       const userId = req.userId;
       const { productId } = req.body;
         if (!productId) {
            return res.status(400).json({
                error: true,
                success: false,
                message: 'Product ID is required'
            });
        }
        const existingCartProduct = new CartProductModel({
            userId : userId,
            productId : productId,
            quantity : 1
        });
        const savedCartProduct = await existingCartProduct.save();

        const updateCart = await UserModel.
        updateOne(
            { _id: userId },
            { $push: { shopping_cart : productId } }
        );
        if (!updateCart) {
            return res.status(500).json({
                error: true,
                success: false,
                message: 'Failed to update user cart'
            });
        }
        res.status(201).json({
            error: false,
            success: true,
            message: 'Product added successfully',
            data: savedCartProduct
        });
    } catch (error) {
        res.status(500).json(
            {
                error:true,
                success: false,
                message: error.message || error
            });
    }
}