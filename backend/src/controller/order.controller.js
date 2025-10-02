import CartProductModel from "../model/cartproduct.model.js";
import OrderModel from "../model/order.model.js";
import UserModel from '../model/user.model.js'
import mongoose from "mongoose";

export async function CashPayment(req, res) {
  try {
    const userId = req.userId;
    const { list_items, totalAmt, addressId, subTotalAmt } = req.body;

    const payload = list_items.map(el => ({
      userId: userId,
      orderId: `ORD-${new mongoose.Types.ObjectId().toString()}`,
      productId: el.productId._id,
      product_details: {
        name: el.productId.name,
        images: el.productId.image,
      },
      paymentId: `PI-${new mongoose.Types.ObjectId().toString()}`,
      payment_status: "CASH ON DELIVERY",
      delivery_address: addressId,
      subTotalAmt: subTotalAmt,
      totalAmt: totalAmt,
    }));

    const generateOrder = await OrderModel.insertMany(payload);

    if (generateOrder && generateOrder.length > 0) {
      const orderedProductIds = list_items.map(el => el.productId._id);

      await CartProductModel.deleteMany({
        userId,
        productId: { $in: orderedProductIds },
      });

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

export async function OnlinePayment(req, res) {
  try {
    const userId = req.userId;
    const { list_items, totalAmt, addressId, subTotalAmt } = req.body;

    const payload = list_items.map(el => ({
      userId: userId,
      orderId: `ORD-${new mongoose.Types.ObjectId().toString()}`,
      productId: el.productId._id,
      product_details: {
        name: el.productId.name,
        images: el.productId.image,
      },
      paymentId: `PI-${new mongoose.Types.ObjectId().toString()}`,
      payment_status: "ONLINE PAYMENT",
      delivery_address: addressId,
      subTotalAmt: subTotalAmt,
      totalAmt: totalAmt,
    }));

    const generateOrder = await OrderModel.insertMany(payload);

    if (generateOrder && generateOrder.length > 0) {
      const orderedProductIds = list_items.map(el => el.productId._id);

      await CartProductModel.deleteMany({
        userId,
        productId: { $in: orderedProductIds },
      });

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

export async function GetOrders(req, res) {
  try {
    const userId = req.userId;
    const orders = await OrderModel.find({ userId }).sort({ createdAt: -1 }).populate('delivery_address').exec();
    return res.json({
      message: "Orders fetched successfully",
      error: false,
      success: true,
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message || error,
    });
  }
}
