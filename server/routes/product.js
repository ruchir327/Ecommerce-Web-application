import express from "express";
const router = express.Router();

// middlewares
import { authCheck, adminCheck } from "../middlewares/auth";

// controller
import {
  create,
  listAll,
  remove,
  read,
  update,
  list,
  productsCount,
  productStar,
  listRelated,
  searchFilters,
} from "../controllers/product";

// routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", productsCount);

router.get("/products/:count", listAll); // products/100
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);
router.put("/product/:slug", authCheck, adminCheck, update);

router.post("/products", list);
router.put("/product/star/:productId", authCheck, productStar);
router.get("/product/related/:productId", listRelated);
router.post("/search/filters", searchFilters);

module.exports = router;
