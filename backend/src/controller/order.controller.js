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
      orderId: `ORD-${new mongoose.Types.ObjectId().toString()}`, // ✅ unique orderId
      productId: el.productId._id,
      product_details: {
        name: el.productId.name,
        images: el.productId.image, // keep full image array
      },
      paymentId: "",
      payment_status: "CASH ON DELIVERY",
      delivery_address: addressId,
      subTotalAmt: subTotalAmt,
      totalAmt: totalAmt,
    }));

    // ✅ Create order(s)
    const generateOrder = await OrderModel.insertMany(payload);

    if (generateOrder && generateOrder.length > 0) {
      // ✅ Extract ordered product IDs
      const orderedProductIds = list_items.map(el => el.productId._id);

      // ✅ Remove only those products from cart
      await CartProductModel.deleteMany({
        userId,
        productId: { $in: orderedProductIds },
      });

      // ✅ Remove same product refs from User.shopping_cart
      await UserModel.updateOne(
        { _id: userId },
        { $pull: { shopping_cart: { $in: orderedProductIds } } }
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
