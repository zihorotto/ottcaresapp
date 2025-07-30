import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import carersRoutes from "../src/routes/carers.js";

const app = express();
app.use(express.json());
app.use("/carers", carersRoutes);

describe("Carers API", () => {
  it("GET /carers should return 401 if not authenticated", async () => {
    const res = await request(app).get("/carers");
    expect(res.statusCode).toBe(401);
  });
});
