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

        const data = await AddressModel.find({ userId: userId }).sort({ createdAt: -1 });
        return res.status(200).json({
            message: "Address fetched Successfully",
            data: data,
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

export const deleteAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).json({ message: "Address ID is required" });
        }

        const address = await AddressModel.findOne({ _id: _id, userId: userId });
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }

        await AddressModel.deleteOne({ _id: _id, userId: userId });

        await userModel.updateOne(
            { _id: userId },
            { $pull: { address_details: _id } }
        );

        return res.status(200).json({
            message: "Address deleted Successfully",
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

export const updateAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const { _id, address_line, city, state, pincode, country, mobile } = req.body;

        const address = await AddressModel.findOneAndUpdate(
            { _id, userId },
            {
                address_line,
                city,
                state,
                pincode,
                country,
                mobile
            },
            { new: true } // return updated doc
        );

        if (!address) {
            return res.status(404).json({
                message: "Address not found",
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            message: "Address updated successfully",
            data: address,
            error: false,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};
