import express from "express";
const router = express.Router();

// middlewares
import { authCheck, adminCheck } from "../middlewares/auth";

// controller
import { create, remove, list } from "../controllers/coupon";

// routes
router.post("/coupon", authCheck, adminCheck, create);
router.get("/coupons", list);
router.delete("/coupon/:couponId", authCheck, adminCheck, remove);

module.exports = router;
