import express from "express";
const router = express.Router();

// middlewares
import { authCheck } from "../middlewares/auth";
// controllers
import {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  getUserAddress,
  applyCouponToUserCart,
  removeItemFromCart,
  createOrder,
  orders,
  addToWishlist,
  wishlist,
  removeFromWishlist,
  createCashOrder,
} from "../controllers/user";

router.post("/user/cart", authCheck, userCart); // save cart
router.get("/user/cart", authCheck, getUserCart); // get cart
router.delete("/user/cart", authCheck, emptyCart); // empty cart
router.post("/user/address", authCheck, saveAddress);
router.get("/user/address", authCheck, getUserAddress);
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);
router.post("/user/order", authCheck, createOrder);
router.get("/user/orders", authCheck, orders);
router.post("/user/cash-order", authCheck, createCashOrder); // cod

router.delete("/user/cart/removeItemFromCart/:productId",authCheck,removeItemFromCart
);

// wishlist
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);

// router.get("/user", (req, res) => {
//   res.json({
//     data: "hey you hit user API endpoint",
//   });
// });

module.exports = router;
