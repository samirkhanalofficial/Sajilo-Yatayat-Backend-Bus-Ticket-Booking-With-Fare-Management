import mongoose from "mongoose";
import Fare from "./fare.model";
import { khaltitype } from "../utils/types/khalti.type";

const khaltiSchema = new mongoose.Schema<khaltitype>({
  token: { type: String, required: true },
  mobile: { type: String, required: true },
  amount: { type: Number, required: true },
  fare: { type: String, required: true, ref: Fare },
  isPaid: { type: Boolean, default: false },
});

const Khalti = mongoose.models.Khalti || mongoose.model("Khalti", khaltiSchema);
export default Khalti;
