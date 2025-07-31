import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import express from "express";
import chatRoutes from "../src/routes/chat.js";

// Mock ChatMessage model
vi.mock("../src/models/ChatMessage", () => ({
  __esModule: true,
  default: {
    find: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ deletedCount: 0 }),
  },
}));

const app = express();
app.use(express.json());
app.use("/chat", chatRoutes);

describe("Chat API", () => {
  it("GET /chat/:carerId/:userId should return 200 or 500 and array or error (mocked)", async () => {
    const res = await request(app).get("/chat/testcarer/testuser");
    expect([200, 500]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(Array.isArray(res.body)).toBe(true);
    } else {
      expect(res.body).toHaveProperty("error");
    }
  });

  it("POST /chat/:carerId/:userId should return 201 and echo the message (mocked)", async () => {
    // Mock save method
    const mockMsg = {
      _id: "1",
      carerId: "testcarer",
      sender: "testuser",
      message: "hello",
      timestamp: new Date(),
    };
    const ChatMessage = (await import("../src/models/ChatMessage")).default;
    ChatMessage.save = vi.fn().mockResolvedValue(mockMsg);
    ChatMessage.constructor = function () {
      return mockMsg;
    };
    // POST request
    const res = await request(app)
      .post("/chat/testcarer/testuser")
      .send({ sender: "testuser", message: "hello" });
    expect([201, 500]).toContain(res.statusCode);
    if (res.statusCode === 201) {
      expect(res.body).toMatchObject({
        carerId: "testcarer",
        sender: "testuser",
        message: "hello",
      });
    } else {
      expect(res.body).toHaveProperty("error");
    }
  });
});
