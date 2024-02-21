import mongoose, { Schema } from "mongoose";
import Departure from "./departure.model";
import { FARESTATUS } from "../utils/enums/departure-status.enum";
import User from "./user.model";
import { fareType } from "../utils/types/fare.type";
import Bus from "./bus.model";

const fareSchema = new Schema<fareType>({
  seats: { type: [Number], required: true },
  departure: { type: String, required: true, ref: Departure },
  bus: { type: String, required: true, ref: Bus },
  faredBy: { type: String, required: true, ref: User },
  isFaredByUser: { type: Boolean, required: true },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: Object.values(FARESTATUS),
    required: true,
  },

  timestamp: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const Fare = mongoose.models.Fare || mongoose.model("Fare", fareSchema);

export default Fare;
