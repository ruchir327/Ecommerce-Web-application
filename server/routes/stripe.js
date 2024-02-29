import express from "express";
const router = express.Router();

// middlewares
import { authCheck } from "../middlewares/auth";

import { createPaymentIntent,stripeSuccess } from "../controllers/stripe";
// import { route }from  "./user";
// middleware

router.post("/create-payment-intent", authCheck, createPaymentIntent);
router.post("/paid-enrollment/:userId", authCheck, stripeSuccess);

module.exports = router;
