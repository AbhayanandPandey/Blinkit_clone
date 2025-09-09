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
            mobile
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
            {   message: error.message||error,
                error: true,
                success: false 
            });
    }
}