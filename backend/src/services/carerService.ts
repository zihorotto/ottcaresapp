export async function getCarerByEmail(email: string) {
  return Carer.findOne({ email });
}
import Carer from "../models/Carer";

export async function getAllCarers() {
  return Carer.find();
}

export async function getCarerById(id: string) {
  return Carer.findById(id);
}

export async function createCarer(data: {
  name: string;
  city: string;
  experience?: number;
  available?: boolean;
  profileImageUrl?: string;
  email?: string;
  phone?: string;
  references?: string[];
  availabilityDetails?: string;
  role?: string;
  diseases?: string;
}) {
  const carer = new Carer(data);
  return carer.save();
}

export async function updateCarer(
  id: string,
  data: Partial<{
    name: string;
    city: string;
    experience: number;
    available: boolean;
    profileImageUrl?: string;
    email?: string;
    phone?: string;
    references?: string[];
    availabilityDetails?: string;
  }>
) {
  return Carer.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteCarer(id: string) {
  return Carer.findByIdAndDelete(id);
}
