import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    image: String,
    role: {
      type: String,
      default: 'user',
    },
    contact: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    emailVerified: {
      type: Boolean,
      default: false,
    },
    id: String,
  },{timestamps: true}
)

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User