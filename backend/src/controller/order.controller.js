import CartProductModel from "../model/cartproduct.model.js";
import OrderModel from "../model/order.model.js";
import UserModel from '../model/user.model.js'
import mongoose from "mongoose";

export async function CashPayment(req, res) {
    try {
        const userId = req.userId;
        const { list_items, totalAmt, addressId, subTotalAmt } = req.body;

        // Build order payload
        const payload = list_items.map(el => ({
            userId: userId,
            orderId: `ORD-${new mongoose.Types.ObjectId().toString()}`, // ✅ correct unique order id
            productId: el.productId._id,
            product_details: {
                name: el.productId.name,
                images: el.productId.image, // full array of images
            },
            paymentId: "",
            payment_status: "CASH ON DELIVERY",
            delivery_address: addressId,
            subTotalAmt: subTotalAmt, // ✅ fixed
            totalAmt: totalAmt,       // ✅ fixed
        }));

        // Create orders
        const generateOrder = await OrderModel.insertMany(payload);

        // ✅ Only clear cart if order placed successfully
        if (generateOrder && generateOrder.length > 0) {
            await CartProductModel.deleteMany({ userId });
            await UserModel.updateOne(
                { _id: userId },
                { $set: { shopping_cart: [] } } // clear cart reference in user
            );
        }

        return res.json({
            message: "Order Placed Successfully",
            error: false,
            success: true,
            data: generateOrder,
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            success: false,
            message: error.message || error,
        });
    }
}
