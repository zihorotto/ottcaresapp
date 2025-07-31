import mongoose from "mongoose";

const CarerSchema = new mongoose.Schema({
  name: String,
  city: String,
  experience: Number,
  available: Boolean,
  profileImageUrl: String,
  email: String,
  phone: String,
  references: [String],
  availabilityDetails: String,
  role: String,
  diseases: String,
});

export default mongoose.model("Carer", CarerSchema);
