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
  role: String, // 'pfleger', 'patient', 'relative'
  diseases: String, // betegségek, támogatási igények (patient/relative)
});

export default mongoose.model("Carer", CarerSchema);
