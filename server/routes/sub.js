import express from "express";
const router = express.Router();

// middlewares
import { authCheck, adminCheck }  from "../middlewares/auth";

// controller
import { create, read, update, remove, list } from "../controllers/sub";

// routes
router.post("/sub", authCheck, adminCheck, create);
router.get("/subs", list);
router.get("/sub/:slug", read);
router.put("/sub/:slug", authCheck, adminCheck, update);
router.delete("/sub/:slug", authCheck, adminCheck, remove);

module.exports = router;
