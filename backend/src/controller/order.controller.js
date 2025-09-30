import OrderModel from "../model/order.model.js";
import UserModel from '../model/user.model.js'

export function CashPayment(req, res) {
    try {
        const userId = req.userId
        const {list_items, totalAmt, addressId, subTotalAmt,  } = req.body

        
    } catch (error) {
        return res.status(500).json({
            error: true,
            success: false,
            message: error.message || error
        })
    }
}