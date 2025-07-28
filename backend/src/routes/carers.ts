// Add this to your main Express app (usually in src/index.ts or app.ts):
// import express from "express";
// app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
import { Router } from "express";
import multer from "multer";
import sharp from "sharp";
import path from "path";
import {
  getAllCarers,
  getCarerById,
  createCarer,
  updateCarer,
  deleteCarer,
} from "../services/carerService";
const router = Router();

const UPLOADS_PATH = path.resolve(__dirname, "../../uploads");
import fs from "fs";
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

// Get all carers
router.get("/", async (req, res) => {
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
        __v: obj.__v,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// Create new carer (with optional image upload)
router.post("/", upload.single("profileImage"), async (req, res) => {
  try {
    const { name, city, email, phone, availabilityDetails } = req.body;
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
        const fs = await import("fs/promises");
        await fs.unlink(filePath);
        await fs.rename(filePath + "_resized", filePath);
        profileImageUrl = `/uploads/${req.file.filename}`;
      } catch (err) {
        // Remove broken file if sharp fails
        try {
          const fs = await import("fs/promises");
          await fs.unlink(path.join(UPLOADS_PATH, req.file.filename));
        } catch {}
        return res
          .status(500)
          .json({ error: "Image processing failed", details: err?.toString() });
      }
    }
    experience = Number(experience);
    if (typeof available === "string") {
      available = available === "true";
    }
    if (!name || !city || isNaN(experience) || typeof available !== "boolean") {
      return res.status(400).json({ error: "Missing or invalid fields" });
    }
    const newCarer = await createCarer({
      name,
      city,
      experience,
      available,
      profileImageUrl,
      email,
      phone,
      references,
      availabilityDetails,
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
      __v: obj.__v,
    });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});
// Get single carer
router.get("/:id", async (req, res) => {
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

// Update carer
router.put("/:id", async (req, res) => {
  try {
    const updated = await updateCarer(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// Delete carer
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await deleteCarer(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
