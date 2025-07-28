import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import carerRoutes from "./routes/carers";
import chatRoutes from "./routes/chat";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://16.171.144.204:3000",
    credentials: true,
  },
});
const PORT = 3001;

app.use(
  cors({
    origin: "http://16.171.144.204:3000",
    credentials: true,
  })
);
app.use(express.json());
import path from "path";
const UPLOADS_PATH = path.resolve(__dirname, "../uploads");
// Add CORS header for static image responses to fix ORB
app.use("/uploads", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://16.171.144.204:3000");
  next();
});
app.use("/uploads", express.static(UPLOADS_PATH));
app.use("/api/carers", carerRoutes);
app.use("/api/chat", chatRoutes);

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
  .connect("mongodb://localhost:27017/noracares")
  .then(() => {
    console.log("MongoDB connected");
    server.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error(err));
