import { Router } from "express";
import ChatMessage from "../models/ChatMessage";

const router = Router();

// Get all messages for a carer
router.get("/:carerId", async (req, res) => {
  try {
    const messages = await ChatMessage.find({
      carerId: req.params.carerId,
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Add a new message
router.post("/:carerId", async (req, res) => {
  try {
    const { sender, message } = req.body;
    const chatMsg = new ChatMessage({
      carerId: req.params.carerId,
      sender,
      message,
      timestamp: new Date(),
    });
    await chatMsg.save();
    res.status(201).json(chatMsg);
  } catch (err) {
    res.status(500).json({ error: "Failed to save message" });
  }
});

// Delete all messages for a carer
router.delete("/:carerId", async (req, res) => {
  try {
    await ChatMessage.deleteMany({ carerId: req.params.carerId });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete messages" });
  }
});

export default router;
