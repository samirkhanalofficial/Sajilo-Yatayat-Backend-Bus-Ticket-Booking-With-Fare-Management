import mongoose, { Schema } from "mongoose";
import Bus from "./bus.model";

const departureSchema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  bus: { type: String, required: true, ref: Bus },
  date: { type: Date, required: true },
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
