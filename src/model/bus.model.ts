import mongoose from "mongoose";
import User from "./user.model";
import { busType } from "../utils/types/bus.type";

const busSchema = new mongoose.Schema<busType>({
  images: { type: [String], required: true },
  busnumber: { type: String, required: true },
  owners: { type: [String], required: true, ref: User },
  yatayat: { type: String, required: true },
  bustype: { type: String, enum: Object.values(BUSTYPE), required: true },
  leftSeats: { type: Number, required: true },
  rightSeats: { type: Number, required: true },
  lastSeats: { type: Number, required: true },
  features: {
    type: [String],
    enum: Object.values(BUSFEATURES),
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const Bus = mongoose.models.Bus || mongoose.model("Bus", busSchema);
export default Bus;
