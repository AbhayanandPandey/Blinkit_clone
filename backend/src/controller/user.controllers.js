import UserModel from "../model/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../config/sendEmail";
import verifyEmailTemplate from "../utils/verifyEmailTempalte";

export async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                error: true,
                success: false
            });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                error: true,
                success: false
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
        });

        const save = await newUser.save();

        const VreifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;
        const verifyEmail = await sendEmail({
            to: email,
            subject: "Verify Your Email from blinkyt",
            html: verifyEmailTemplate({
                name,
                url: VreifyEmailUrl
            })
        });

        return res.status(200).json({
            message: "User registered successfully, please verify your email",
            error: false,
            success: true
        });

    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}