import { request } from 'express';
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

        const checkItem = await CartProductModel.findOne({ userId: userId, productId: productId });
        if (checkItem) {
            return res.status(400).json({
                error: true,
                success: false,
                message: 'Product already in cart'
            });
        }

        const existingCartProduct = new CartProductModel({
            userId: userId,
            productId: productId,
            quantity: 1
        });
        const savedCartProduct = await existingCartProduct.save();

        const updateCart = await UserModel.
            updateOne(
                { _id: userId },
                { $push: { shopping_cart: productId } }
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
                error: true,
                success: false,
                message: error.message || error
            });
    }
}

export const getCartItems = async (req, res) => {
    try {
        const userId = req.userId;
        const cartItems = await CartProductModel.find({ userId: userId }).populate('productId');
        res.status(200).json({
            error: false,
            success: true,
            message: 'Cart items retrieved successfully',
            data: cartItems
        });
    } catch (error) {
        res.status(500).json(
            {
                error: true,
                success: false,
                message: error.message || error
            });
    }
}

export const updateItems = async (req, res) => {
    try {
        const userId = request.userId;
        const { _id, qty } = req.body;

        if (!_id || !qty) {
            res.status(400).json({
                erroe: true,
                success: false,
                message: 'Cart item ID and quantity are required'
            })
        }

        const updatedItem = await CartProductModel.updateOne(
            { _id: _id },
            { quantity: qty }
        );

        return res.status(200).json(
            {
                error: false,
                success: true,
                message: 'Item added',
                data: updatedItem
            }
        );

    } catch (error) {
        return res.status(500).json({
            error: true,
            success: false,
            message: ErrorEvent.message || erroe
        })
    }
}

export const deleteCartItem = async (req, res) => {
    try {
        const userId = req.userId;
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).json({
                error: true,
                success: false,
                message: 'Cart item ID is required'
            });
        }

        const deletedItem = await CartProductModel.deleteOne({ _id: _id, userId: userId });

        if (deletedItem.deletedCount === 0) {
            return res.status(404).json({
                error: true,
                success: false,
                message: 'Cart item not found'
            });
        }

        res.status(200).json({
            error: false,
            success: true,
            message: 'Cart item deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            success: false,
            message: error.message || error
        });
    }
}