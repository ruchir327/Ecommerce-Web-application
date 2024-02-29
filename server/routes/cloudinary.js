import express from "express";
const router = express.Router();
import { multerInstance } from "../controllers/cloudinary";

// middlewares
import { authCheck, adminCheck } from "../middlewares/auth.js";

// controllers
import { upload, remove } from "../controllers/cloudinary";

router.post(
  "/uploadimages",
  authCheck,
  adminCheck,
  multerInstance.single("image"),
  upload
);
router.post("/removeimage", authCheck, adminCheck, remove);

module.exports = router;
