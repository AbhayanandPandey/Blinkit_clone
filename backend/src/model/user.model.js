import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter a name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter an email"],
    unique: true,
    match: /.+\@.+\..+/,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter a password"],
  },
  avatar: {
    type: String,
    default: ""
  },
  mobile: {
    type: Number,
    default: null,
    unique: true,
    match: /^\d{10}$/,
  },
  refresh_token: {
    type: String,
    default: "",
  },
  verify_email: {
    type: Boolean,
    default: false,
  },
  last_login_date: {
    type: Date,
    default: '',
  },
  sattus: {
    type: String,
    enum: ["Active", "Inactive", "Suspended"],
    default: "active",
  },
  address_details: [
    {
        type:mongoose.Schema.Types.ObjectId,
        ref: "address",
    }
  ],
  shopping_cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cartProduct",
    },
  ],
  orderHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
  ],
  forgot_password_otp: {
    type: String,
    default:null
  },
  forgot_password_expiry: {
    type: Date,
    default:""
  },
  role: {
    type: String, 
    enum:['Admin','User'],
    default:"USER"
  }
}, {
  timestamps: true,
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;