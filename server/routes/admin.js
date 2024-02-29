import express from "express";
import {auth} from "../firebase"
const router = express.Router();
import { authCheck, adminCheck } from "../middlewares/auth.js";

import  { orders, orderStatus } from "../controllers/admin";

// routes
router.get("/admin/orders", authCheck, adminCheck, orders);
router.put("/admin/order-status", authCheck, adminCheck, orderStatus);

module.exports = router;
