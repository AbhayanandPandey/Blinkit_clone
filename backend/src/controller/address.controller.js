import AddressModel from "../model/address.model.js";
import userModel from "../model/user.model.js";

export const addAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const { address_line, city, state, pincode, country, mobile } = req.body;

        if (!address_line || !city || !state || !pincode || !country || !mobile) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newAddress = new AddressModel({
            address_line,
            city,
            state,
            pincode,
            country,
            mobile,
            userId: userId
        });

        const savedAddress = await newAddress.save();

        await userModel.updateOne(
            { _id: userId },
            { $push: { address_details: savedAddress._id } }
        );

        return res.status(201).json({
            message: "Address Created Successfully",
            address: savedAddress,
            error: false,
            success: true
        });
    } catch (error) {
        return res.status(500).json(
            {
                message: error.message || error,
                error: true,
                success: false
            });
    }
}

export const getAddress = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await userModel.findById(userId).populate('address_details');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Address fetched successfully",
            addresses: user.address_details,
            error: false,
            success: true
        });
    } catch (error) {
        return res.status(500).json(
            {
                message: error.message || error,
                error: true,
                success: false
            });
    }
}