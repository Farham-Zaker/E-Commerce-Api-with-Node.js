const express = require("express");
const router = express.Router();
const {
  addProducRoute,
  deleteProductRoute,
  updateProductRoute,
} = require("src/routes/admin/controller.js");
const isAdmin = require("src/middleware/isAdmin.js");

router.post("/add-product/:token", isAdmin, addProducRoute);
router.delete("/delete-product/:id/:token", isAdmin, deleteProductRoute);
router.put("/update-product/:id/:token", isAdmin, updateProductRoute);

module.exports = router;

// const multer = require("multer");
// const madir = require("mkdirp");
// const path = require("path");
// const {
//   dashboardRoute,
//   profileRoute,
//   changePhotoRoute,
// } = require("src/routes/dashboard/controller.js");
// const isLogin = require("src/middleware/isLogin.js");

// const storage = multer.diskStorage({
//   filename: (req, file, done) => {
//     console.log(checkFileType(file, done));
//     // done(null, "fdkljb" + checkFileType(file, done));
//   },
//   destination: (req, file, done) => {
//     done(null, "./upload");
//   },
// });
// const checkFileType = function (file, done) {
//   //Allowed file extensions

//   const fileTypes = /jpeg|jpg|png|gif|svg/; //check extension names

//   const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

//   if (extName) {
//     return done(null, true);
//   } else {
//     done("Error: You can Only Upload Images!!");
//   }
// };
// const upload = multer({
//   storage,
//   fileFilter: (req, file, done) => {
//     checkFileType(file, done);
//   },
// }).single("photo");
// router.get("/", isLogin, dashboardRoute);
// router.get("/profile", profileRoute);
