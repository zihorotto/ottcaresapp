// All import statements at the top
import { Router } from "express";
import { authenticateJWT } from "../middleware/authenticateJWT";
import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import {
  getAllCarers,
  getCarerById,
  createCarer,
  updateCarer,
  deleteCarer,
} from "../services/carerService";

const router = Router();

// Get current user's carer profile (public)
router.get("/me", authenticateJWT, async (req, res) => {
  try {
    // Email from JWT (Cognito)
    const user = (req as any).user;
    const email = user?.email;
    if (!email) return res.status(400).json({ error: "No email in token" });
    const carer = await getAllCarers();
    const found = carer.find((c: any) => c.email === email);
    if (!found) return res.status(404).json({ error: "Profile not found" });
    res.json(found);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// eslint-disable-next-line no-undef
const UPLOADS_PATH = path.resolve(__dirname, "../../uploads");
if (!fs.existsSync(UPLOADS_PATH)) {
  fs.mkdirSync(UPLOADS_PATH, { recursive: true });
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Get all carers (require login)
router.get("/", authenticateJWT, async (req, res) => {
  try {
    const carers = await getAllCarers();
    const baseUrl = req.protocol + "://" + req.get("host");
    const mapped = carers.map((carer) => {
      if (
        carer.profileImageUrl &&
        carer.profileImageUrl.startsWith("/uploads/")
      ) {
        return {
          ...carer.toObject(),
          profileImageUrl: `${baseUrl}${carer.profileImageUrl}`,
        };
      }
      return carer;
    });
    res.json(
      mapped.map((obj) => ({
        _id: obj._id,
        name: obj.name,
        city: obj.city,
        experience: obj.experience,
        available: obj.available,
        profileImageUrl: obj.profileImageUrl,
        role: obj.role,
        __v: obj.__v,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});
router.post(
  "/",
  
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const { name, city, email, phone, availabilityDetails, role, diseases } =
        req.body;
      let experience = req.body.experience;
      let available = req.body.available;
      let profileImageUrl = req.body.profileImageUrl || "";
      let references: string[] = [];
      if (Array.isArray(req.body.references)) {
        references = req.body.references;
      } else if (typeof req.body.references === "string") {
        references = [req.body.references];
      }

      // If image upload was expected but failed
      if (req.file === undefined && req.body.profileImageUrl === undefined) {
        return res.status(400).json({ error: "No image uploaded" });
      }

      if (req.file) {
        try {
          // Resize image to max 400x400px and overwrite original
          const filePath = path.join(UPLOADS_PATH, req.file.filename);
          await sharp(filePath)
            .resize(200, 200, { fit: "cover" })
            .toFile(filePath + "_resized");
          // Replace original with resized
          const fsPromises = await import("fs/promises");
          await fsPromises.unlink(filePath);
          await fsPromises.rename(filePath + "_resized", filePath);
          profileImageUrl = `/uploads/${req.file.filename}`;
        } catch (err) {
          // Remove broken file if sharp fails
          try {
            const fsPromises = await import("fs/promises");
            await fsPromises.unlink(path.join(UPLOADS_PATH, req.file.filename));
          } catch (e) {
            // ignore file delete error
          }
          return res.status(500).json({
            error: "Image processing failed",
            details: err?.toString(),
          });
        }
      }
      // Validate required fields
      if (!role) {
        return res.status(400).json({ error: "Missing role" });
      }
      if (!name || !city) {
        return res.status(400).json({ error: "Missing name or city" });
      }
      if (role === "pfleger") {
        experience = Number(experience);
        if (typeof available === "string") {
          available = available === "true";
        }
        if (isNaN(experience) || typeof available !== "boolean") {
          return res.status(400).json({ error: "Missing or invalid fields" });
        }
      }
      if (
        (role === "patient" || role === "relative") &&
        (!diseases || diseases.length < 1)
      ) {
        return res
          .status(400)
          .json({ error: "Missing diseases for patient/relative" });
      }
      const newCarer = await createCarer({
        name,
        city,
        experience: role === "pfleger" ? experience : undefined,
        available: role === "pfleger" ? available : undefined,
        profileImageUrl,
        email,
        phone,
        references,
        availabilityDetails,
        role,
        diseases:
          role === "patient" || role === "relative" ? diseases : undefined,
      });
      const obj = newCarer.toObject();
      if (obj.profileImageUrl && obj.profileImageUrl.startsWith("/uploads/")) {
        const baseUrl = req.protocol + "://" + req.get("host");
        obj.profileImageUrl = `${baseUrl}${obj.profileImageUrl}`;
      }
      res.status(201).json({
        _id: obj._id,
        name: obj.name,
        city: obj.city,
        experience: obj.experience,
        available: obj.available,
        profileImageUrl: obj.profileImageUrl,
        email: obj.email,
        phone: obj.phone,
        references: obj.references,
        availabilityDetails: obj.availabilityDetails,
        role: obj.role,
        diseases: obj.diseases,
        __v: obj.__v,
      });
    } catch (err) {
      res.status(500).json({ error: "Database error" });
    }
  }
);
// Get single carer (protected)
router.get("/:id", authenticateJWT, async (req, res) => {
  try {
    const carer = await getCarerById(req.params.id);
    if (!carer) return res.status(404).json({ error: "Not found" });
    let mapped: any;
    if (
      carer.profileImageUrl &&
      carer.profileImageUrl.startsWith("/uploads/")
    ) {
      const baseUrl = req.protocol + "://" + req.get("host");
      mapped = {
        ...carer.toObject(),
        profileImageUrl: `${baseUrl}${carer.profileImageUrl}`,
      };
    } else {
      mapped = carer.toObject();
    }
    res.json({
      _id: mapped._id,
      name: mapped.name,
      city: mapped.city,
      experience: mapped.experience,
      available: mapped.available,
      profileImageUrl: mapped.profileImageUrl,
      email: mapped.email, // New field
      phone: mapped.phone, // New field
      references: mapped.references, // New field
      availabilityDetails: mapped.availabilityDetails, // New field
      __v: mapped.__v,
    });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// Update carer (protected)
router.put("/:id", authenticateJWT, async (req, res) => {
  try {
    const updated = await updateCarer(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// Delete carer (protected)
router.delete("/:id", authenticateJWT, async (req, res) => {
  try {
    const deleted = await deleteCarer(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
