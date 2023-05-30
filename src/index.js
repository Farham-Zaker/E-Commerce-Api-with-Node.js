const express = require("express");
const router = express.Router();

router.use("/auth", require("src/routes/auth"));

router.use("/admin", require("src/routes/admin"));

router.use("/products", require("src/routes/products"));

router.use("/user", require("src/routes/user"));

module.exports = router;
