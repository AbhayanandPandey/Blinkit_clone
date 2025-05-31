import UserModel from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../config/sendEmail.js";
import verifyEmailTemplate from "../utils/verifyEmailTempalte.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";

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
        const hashedPassword = await bcryptjs.hash(password, salt);

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

export async function loginUser(req,res) {
    try {
        const {email, password } = req.body;

        if(!email||!password){
            return res.json({
                message:"plese enter email or password",
                error:true,
                success:false
            })
        }

        const user = await UserModel.findOne({ email })
        if(!user)
        {
            return res.json({
                message:"user not registered",
                error:true,
                success:false
            })
        }
        
        if(user.status==="Inactive")
        {
            return res.status(400).json({
                message:"user is inactive, plese connect to admin",
                error:true,
                success:false
            })
        }
        if(user.status==="Suspended")
        {
            return res.status(400).json({
                message:"user is suspended, plese connect to admin",
                error:true,
                success:false
            })
        }

        const hashPassword = await bcryptjs.compare(password,user.password)

        if(!hashPassword)
        {
            return res.status(400).json({
                message:"plese enter a valid password",
                error:true,
                success:false
            })
        }

        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);

        const cookieOption = 
        {
            httpOnly:true,
            secure:true,
            sameSite:'None'
        }
        res.cookie('accessToken',accessToken,cookieOption)
        res.cookie('refreshToken',refreshToken,cookieOption)

        const date = Date.now();
        const updateUser = await UserModel.updateOne(
            {_id:user._id},
            { $set:
                {last_login_date:date} 
            }
        )

        return res.status(200).json({
            message:'login successfuly',
            error:false,
            success:true,
            data:{
                accessToken,
                refreshToken
            }
        })


    } catch (error) {
        return res.status(500).json({
            message:error.message||error,
            error:true,
            success:false
        })
    }
}

export async function verifyEmail(req, res) {
    try {
        const { code } = req.body;
        const user = await UserModel.find({ _id: code })
        if (!user) {
            return res.status(400).json({
                message: "invalid User",
                erroe: true,
                success: false
            })
        }
        const updatedUser = await UserModel.updateOne({ id: code }, { verify_email: true })

        return res.json({
            message: "verification Succeeful",
            erroe: false,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}