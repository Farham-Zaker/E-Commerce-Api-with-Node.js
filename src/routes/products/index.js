const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getByPageNumber,
} = require("src/routes/products/controller.js");

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/page/:pageNumber/:limit", getByPageNumber);

module.exports = router;
