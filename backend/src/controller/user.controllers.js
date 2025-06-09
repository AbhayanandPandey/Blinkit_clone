import UserModel from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import sendEmail from "../config/sendEmail.js";
import verifyEmailTemplate from "../utils/verifyEmailTempalte.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadimageCloudinary.js";
import jwt from 'jsonwebtoken'
import genOtp from "../utils/genOtp.js";
import forgotPassOtp from "../utils/forgotPassOtp.js";

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

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({
                message: "plese enter email or password",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.json({
                message: "user not registered",
                error: true,
                success: false
            })
        }

        if (user.status === "Inactive") {
            return res.status(400).json({
                message: "user is inactive, plese connect to admin",
                error: true,
                success: false
            })
        }
        if (user.status === "Suspended") {
            return res.status(400).json({
                message: "user is suspended, plese connect to admin",
                error: true,
                success: false
            })
        }

        const hashPassword = await bcryptjs.compare(password, user.password)

        if (!hashPassword) {
            return res.status(400).json({
                message: "plese enter a valid password",
                error: true,
                success: false
            })
        }

        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);

        const cookieOption =
        {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }
        res.cookie('accessToken', accessToken, cookieOption)
        res.cookie('refreshToken', refreshToken, cookieOption)

        const date = Date.now();
        const updateUser = await UserModel.updateOne(
            { _id: user._id },
            {
                $set:
                    { last_login_date: date }
            }
        )

        return res.status(200).json({
            message: 'login successfuly',
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken
            }
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function logoutUser(req, res) {
    try {
        const userid = req.userId
        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }
        res.clearCookie('accessToken', cookieOption)
        res.clearCookie('refreshToken', cookieOption)

        const removereRefshToken = await UserModel.findByIdAndUpdate(userid, { refresh_token: '' })

        return res.status(200).json({
            message: 'logout successfully',
            error: false,
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

export async function updateAvatar(req, res) {
    try {
        const userId = req.userId
        const image = req.file;
        const upload = await uploadImageCloudinary(image)

        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            avatar: upload.url
        })

        return res.json({
            message: 'upload profile',
            data: {
                _id: userId,
                avatar: upload.url
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function updateUserDetails(req, res) {
    try {
        const userId = req.userId;
        const { name, email, mobile, password } = req.body

        const hashedPass = ''
        if (password) {
            const salt = await bcryptjs.genSalt(10)
            hashedPass = await bcryptjs.hash(password, salt)
        }

        const updateUser = await UserModel.updateOne({ _id: userId }, {
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(mobile && { mobile: mobile }),
            ...(password && { password: hashedPass })
        })

        return res.json({
            message: 'user updated successfully',
            error: false,
            success: true,
            data: updateUser
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function forgotPassword(req, res) {
    try {
        const { email } = req.body
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "invalid user",
                error: true,
                success: false
            })
        }
        const OTP = genOtp()
        const expTime = new Date() + 60 * 60 * 1000
        const update = await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: OTP,
            forgot_password_expiry: new Date(expTime).toISOString()
        })

        await sendEmail({
            to: email,
            subject: 'Forgot password from Blinkyt',
            html: forgotPassOtp({
                name: user.name,
                otp: OTP
            })
        })

        return res.json({
            message: 'OTP send, check your email',
            error: false,
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

export async function verifyOtp(req, res) {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: 'Please provide both email and OTP',
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid user',
                error: true,
                success: false
            });
        }

        const currentTime = new Date().toISOString();

        if (new Date(user.forgot_password_expiry) < currentTime) {
            return res.status(400).json({
                message: 'OTP expired',
                error: true,
                success: false
            });
        }

        if (otp !== user.forgot_password_otp) {
            return res.status(400).json({
                message: 'Invalid OTP',
                error: true,
                success: false
            });
        }
        user.forgot_password_otp=''
        user.forgot_password_expiry = null; 
        user.save();

        return res.status(200).json({
            message: 'OTP verified successfully',
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
}

export async function resetPas(req, res) {
    try {
        const { email, newPassword, confirmPassword } = req.body

        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message: 'provide required fields',
                error: true,
                success: false
            })
        }
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: 'Invalid user',
                error: true,
                success: false
            })
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: 'password and confirm password must be same',
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPass = await bcryptjs.hash(newPassword, salt)

        const update = await UserModel.findOneAndUpdate(user._id, {
            password: hashPass
        })

        return res.json({
            message: 'password updated successfully',
            error: false,
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

export async function refreshToken(req, res) {
    try {
        const reftoken = req.cookies.refreshToken || req?.header?.authorization?.split(" ")[1];

        if (!reftoken) {
            return res.status(400).json({
                message: 'Invalid token, access denied',
                error: true,
                success: false
            })
        }
        const checkToken = await jwt.verify(reftoken, process.env.SECRET_KEY_REFRESH)
        if (!checkToken) {
            return res.status(401).json({
                message: 'token expired',
                error: true,
                success: false
            })
        }
        const userId = checkToken?._id;
        const newAccessToken = await generateAccessToken(userId)

        const cookieOption =
        {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }
        res.cookie('accessToken',newAccessToken,cookieOption)

        return res.json({
            message:'new access token generated',
            error:false,
            success:true,
            data:{
                accessToken:newAccessToken
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function getUserDetails(req, res) {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({
                message: 'User ID is required',
                error: true,
                success: false
            });
        }
        const user = await UserModel.findById(userId).select('-password -refresh_token -forgot_password_otp -forgot_password_expiry');
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                error: true,
                success: false
            });
        }
        return res.status(200).json({
            message: 'User details retrieved successfully',
            error: false,
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}