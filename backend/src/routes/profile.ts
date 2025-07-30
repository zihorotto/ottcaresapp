import { Router } from "express";
import { authenticateJWT } from "../middleware/authenticateJWT";
const router = Router();

// Get current user profile (from JWT)
router.get("/", authenticateJWT, (req, res) => {
  const user = (req as any).user;
  res.json({
    sub: user?.payload?.sub,
    email: user?.payload?.email,
    // add more fields if needed
  });
});

// Update profile (demo: only email)
router.put("/", authenticateJWT, (req, res) => {
  // In real app: update user in DB or via Cognito admin API
  // Here: just echo back
  res.json({
    message: "Profile update endpoint (implement as needed)",
    data: req.body,
  });
});

export default router;
