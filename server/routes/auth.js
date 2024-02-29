import express from "express";

const router = express.Router();
import { authCheck, adminCheck } from "../middlewares/auth.js";

// import
import { createOrUpdateUser, currentUser } from "../controllers/auth.js";

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;
