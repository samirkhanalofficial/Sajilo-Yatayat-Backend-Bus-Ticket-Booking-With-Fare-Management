import mongoose, { Schema } from "mongoose";
import Bus from "./bus.model";
import Location from "./location.model";
import { departureType } from "../utils/types/departure.type";

const departureSchema = new Schema<departureType>({
  from: { type: String, required: true, ref: Location },
  to: { type: String, required: true, ref: Location },
  bus: { type: String, required: true, ref: Bus },
  date: { type: String, required: true },
  time: { type: String, required: true },
  amount: { type: Number, required: true },
  timestamp: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const Departure =
  mongoose.models.Departure || mongoose.model("Departure", departureSchema);

export default Departure;
