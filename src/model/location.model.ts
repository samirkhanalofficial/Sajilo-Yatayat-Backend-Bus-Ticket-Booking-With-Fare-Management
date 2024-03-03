import mongoose, { Schema } from "mongoose";

const locationSchema = new Schema<locationType>({
  name: { type: String, required: true },
  timestamp: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const Location =
  mongoose.models.Location || mongoose.model("Locations", locationSchema);

export default Location;
