import mongoose, { Schema, Document } from "mongoose";

export interface IChatMessage extends Document {
  carerId: string;
  sender: string;
  message: string;
  timestamp: Date;
}

const ChatMessageSchema: Schema = new Schema({
  carerId: { type: String, required: true },
  sender: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IChatMessage>("ChatMessage", ChatMessageSchema);
