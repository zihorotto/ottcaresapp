/* eslint-disable no-undef */
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import carerRoutes from "./routes/carers";
import chatRoutes from "./routes/chat";
import profileRoutes from "./routes/profile";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "https://16.171.144.204",
    credentials: true,
  },
});
const PORT = 3001;

app.use(
  cors({
    origin: "https://16.171.144.204",
    credentials: true,
  })
);
app.use(express.json());
import path from "path";
const UPLOADS_PATH = path.resolve(__dirname, "../uploads");
// Add CORS header for static image responses to fix CORS
app.use("/uploads", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://16.171.144.204");
  next();
});
app.use("/uploads", express.static(UPLOADS_PATH));
app.use("/api/carers", carerRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/profile", profileRoutes);

// --- Socket.io Chat Events ---
io.on("connection", (socket: import("socket.io").Socket) => {
  console.log("User connected:", socket.id);

  socket.on("chat message", (msg: string) => {
    // Broadcast message to all clients
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

mongoose
  .connect("mongodb://16.171.144.204:27017/noracares")
  .then(() => {
    console.log("MongoDB connected");
    server.listen(PORT, () =>
      console.log(`Server running on https://16.171.144.204`)
    );
  })
  .catch((err) => console.error(err));
