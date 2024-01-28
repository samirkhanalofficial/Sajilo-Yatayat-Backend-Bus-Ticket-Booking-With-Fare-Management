import mongoose from "mongoose";
import { userType } from "../utils/types/user.type";

const userSchema = new mongoose.Schema<userType>({
  name: { type: String, required: true, min: 3, max: 200 },
  mobile: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  gender: { type: String, required: true },
  timestamp: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
