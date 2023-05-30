const express = require("express");
const router = express.Router();
const {
  getUserInfo,
  changeNameRoute,
  changePasswordRoute,
  addToLikesRoute,
  removeFromLikesRoute,
  addToFavoritesRoute,
  removeFromFavoritesRoute,
  addToShoppingCartsRoute,
  removeFromShoppingCartsRoute,
  bodyValdator,
} = require("src/routes/user/controller.js");
const isLogged = require("src/middleware/isLogged.js");
const changeNameValidator = require("src/routes/user/validator.js");

router.get("/info/:token", isLogged, getUserInfo);

router.post(
  "/changeName/:token",
  isLogged,
  changeNameValidator(),
  bodyValdator,
  changeNameRoute
);
router.post("/changePassword/:token", isLogged, changePasswordRoute);

router.post("/addToLikes/:productId/:token", isLogged, addToLikesRoute);
router.delete(
  "/removeFromLikes/:productId/:token",
  isLogged,
  removeFromLikesRoute
);

router.post("/addToFavorites/:productId/:token", isLogged, addToFavoritesRoute);
router.delete(
  "/removeFromFavorites/:productId/:token",
  isLogged,
  removeFromFavoritesRoute
);

router.post(
  "/addToShoppingCarts/:productId/:token",
  isLogged,
  addToShoppingCartsRoute
);
router.delete(
  "/removeFromShoppingCardts/:productId/:token",
  isLogged,
  removeFromShoppingCartsRoute
);

module.exports = router;
