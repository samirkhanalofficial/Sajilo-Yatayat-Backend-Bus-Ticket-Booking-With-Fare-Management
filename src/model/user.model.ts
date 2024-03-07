import mongoose from "mongoose";
import { userType } from "../utils/types/user.type";

const userSchema = new mongoose.Schema<userType>({
  name: { type: String, required: true, min: 3, max: 200 },
  mobile: { type: String, required: true },
  dob: { type: String, required: true },
  address: { type: String, required: true },
  gender: { type: String, required: true },
  timestamp: {
    type: Date,
    required: true,
    default: new Date(),
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
