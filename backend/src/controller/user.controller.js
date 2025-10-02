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

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
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

    const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
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
      name: capitalize(name),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    await sendEmail({
      to: email,
      subject: "Verify Your Email from Blinkyt",
      html: verifyEmailTemplate({
        name: capitalize(name),
        url: `${process.env.FRONTEND_URL}/verify-email?code=${savedUser._id}`
      })
    });

    return res.status(200).json({
      message: "User registered successfully, please verify your email",
      error: false,
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something went wrong",
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
        message: "Please enter email and password",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({
        message: "User not registered",
        error: true,
        success: false,
      });
    }

    if (user.status === "Inactive") {
      return res.status(400).json({
        message: "User is inactive, please contact admin",
        error: true,
        success: false,
      });
    }

    if (user.status === "Suspended") {
      return res.status(400).json({
        message: "User is suspended, please contact admin",
        error: true,
        success: false,
      });
    }

    const hashPassword = await bcryptjs.compare(password, user.password);
    if (!hashPassword) {
      return res.status(400).json({
        message: "Invalid password",
        error: true,
        success: false,
      });
    }

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    const cookieOptions = {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    };

    res.cookie('accessToken', accessToken, cookieOptions);
    res.cookie('refreshToken', refreshToken, cookieOptions);

    await UserModel.updateOne(
      { _id: user._id },
      { $set: { last_login_date: Date.now() } }
    );

    return res.status(200).json({
      message: "Login successful",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function logoutUser(req, res) {
  try {
    const userId = req.userId;

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    };

    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);

    await UserModel.findByIdAndUpdate(userId, { refresh_token: '' });

    return res.status(200).json({
      message: 'Logout successfully',
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
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
            success: true,
            error: false,
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
    let { name, email, mobile, password } = req.body;

    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim();
    const trimmedMobile = mobile?.trim();

    if (!trimmedName && !trimmedEmail && !trimmedMobile && !password) {
      return res.status(400).json({
        message: 'Nothing to update',
        error: true,
        success: false,
      });
    }

    let hashedPass;
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashedPass = await bcryptjs.hash(password, salt);
    }

    const mobileExists = trimmedMobile &&
      await UserModel.findOne({ mobile: trimmedMobile });
    if (mobileExists && mobileExists._id.toString() !== userId) {
      return res.status(400).json({
        message: 'Mobile number already exists',
        error: true,
        success: false,
      });
    }

    const emailExists = trimmedEmail &&
      await UserModel.findOne({ email: trimmedEmail.toLowerCase() });
    if (emailExists && emailExists._id.toString() !== userId) {
      return res.status(400).json({
        message: 'Email already exists',
        error: true,
        success: false,
      });
    }

    await UserModel.updateOne(
      { _id: userId },
      {
        ...(trimmedName && { name: trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1).toLowerCase() }),
        ...(trimmedEmail && { email: trimmedEmail.toLowerCase() }),
        ...(trimmedMobile && { mobile: trimmedMobile }),
        ...(password && { password: hashedPass }),
      }
    );

    return res.json({
      message: 'Updated successfully',
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
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
        user.forgot_password_otp = ''
        user.forgot_password_expiry = ''
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
        const reftoken = req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1];

        if (!reftoken) {
            return res.status(400).json({
                message: 'Invalid token, access denied',
                error: true,
                success: false
            });
        }

        const checkToken = await jwt.verify(reftoken, process.env.SECRET_KEY_REFRESH);
        if (!checkToken) {
            return res.status(401).json({
                message: 'Token expired',
                error: true,
                success: false
            });
        }

        // ✅ fix: use "id" not "_id"
        const userId = checkToken.id;  

        const newAccessToken = await generateAccessToken(userId);

        const cookieOption = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
        };

        res.cookie('accessToken', newAccessToken, cookieOption);

        return res.json({
            message: 'New access token generated',
            error: false,
            success: true,
            data: {
                accessToken: newAccessToken
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
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