const controller = require("src/controller.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const decodeToken = require("src/middleware/decode token.js");
const {
  checkProductAvailibility,
} = require("src/middleware/check product availability.js");

module.exports = new (class Controller extends controller {
  async getUserInfo(req, res) {
    const recievedToken = req.params.token;

    const user = await decodeToken(recievedToken).getUser();
    const { firstName, lastName, email, likes, favorites, shoppingCarts } =
      user;

    res.status(200).json({
      status: "ok",
      data: { firstName, lastName, email, likes, favorites, shoppingCarts },
    });
  }
  async changeNameRoute(req, res) {
    const recievedToken = req.params.token;
    const { firstName, lastName } = req.body;

    const user = await decodeToken(recievedToken).getUser();
  }
  async changePasswordRoute(req, res) {
    const token = req.params.token;
    const decodedToken = decodeToken(token).getUserId();
    const user = await this.User.findById(decodedToken._id);

    const { old_password, new_password } = req.body;

    const decodedPassword = await bcrypt.compare(old_password, user.password);

    if (decodedPassword) {
      const salt = await bcrypt.genSalt(9);
      const hashedNewPassword = await bcrypt.hash(new_password, salt);

      await this.User.findByIdAndUpdate(user._id, {
        password: hashedNewPassword,
      });
      res.status(200).json({
        status: "ok",
        message: "Password successfuly was changed.",
      });
    } else {
      res.status(200).json({
        status: "bad",
        message: "Your first password is incorrect.",
      });
    }
  }

  async addToLikesRoute(req, res) {
    const recievedToken = req.params.token;
    const productId = req.params.productId;

    const userId = await decodeToken(recievedToken).getUserId();
    const user = await decodeToken(recievedToken).getUser();

    const productAvailibility = checkProductAvailibility(productId, user.likes);
    if (productAvailibility) {
      res.status(401).json({
        status: "bad",
        message: `There is a product with such id in 'likes'.`,
      });
    } else {
      await this.User.update(
        { likes: [...user.likes, productId] },
        { where: { id: userId } }
      );
      res.status(201).json({
        status: "ok",
        message: "The desired product successfuly was added in 'likes'.",
        userLikes: [...user.likes, productId],
      });
    }
  }
  async removeFromLikesRoute(req, res) {
    const recievedToken = req.params.token;
    const productId = req.params.productId;

    const userId = await decodeToken(recievedToken).getUserId();
    const user = await decodeToken(recievedToken).getUser();

    const productAvailibility = checkProductAvailibility(productId, user.likes);
    if (!productAvailibility) {
      res.status(401).json({
        status: "bad",
        message: `There is not any product with such id in 'likes'.`,
      });
    } else {
      const removeFromList = user.likes.filter((id) => {
        return id !== productId;
      });
      await this.User.update(
        { likes: removeFromList },
        { where: { id: userId } }
      );
      res.status(201).json({
        status: "ok",
        message: "The desired product successfuly was removed in 'likes'.",
        userLikes: [removeFromList],
      });
    }
  }
  async addToFavoritesRoute(req, res) {
    const recievedToken = req.params.token;
    const productId = req.params.productId;

    const userId = await decodeToken(recievedToken).getUserId();
    const user = await decodeToken(recievedToken).getUser();

    const productAvailibility = checkProductAvailibility(
      productId,
      user.favorites
    );
    if (productAvailibility) {
      res.status(401).json({
        status: "bad",
        message: `There is a product with such id in 'favorites'.`,
      });
    } else {
      try {
        await this.User.update(
          { favorites: [...user.favorites, productId] },
          { where: { id: userId } }
        );
        res.status(201).json({
          status: "ok",
          message: "The desired product successfuly was added in 'favorites'.",
          userFavorites: [...user.favorites, productId],
        });
      } catch (error) {
        res.status(404).json({ status: "bad", message: error });
      }
    }
  }
  async removeFromFavoritesRoute(req, res) {
    const recievedToken = req.params.token;
    const productId = req.params.productId;

    const userId = await decodeToken(recievedToken).getUserId();
    const user = await decodeToken(recievedToken).getUser();

    const productAvailibility = checkProductAvailibility(
      productId,
      user.favorites
    );
    if (!productAvailibility) {
      res.status(401).json({
        status: "bad",
        message: `There is not any product with such id in 'favorites'.`,
      });
    } else {
      try {
        const removeFromList = user.favorites.filter((id) => {
          return id !== productId;
        });
        await this.User.update(
          { favorites: removeFromList },
          { where: { id: userId } }
        );
        res.status(201).json({
          status: "ok",
          message:
            "The desired product successfuly was removed in 'favorites'.",
          userFavorites: removeFromList,
        });
      } catch (error) {
        res.status(404).json({ status: "bad", message: error });
      }
    }
  }
  async addToShoppingCartsRoute(req, res) {
    const recievedToken = req.params.token;
    const productId = req.params.productId;

    const userId = await decodeToken(recievedToken).getUserId();
    const user = await decodeToken(recievedToken).getUser();

    const productAvailibility = checkProductAvailibility(
      productId,
      user.shoppingCarts
    );
    if (productAvailibility) {
      res.status(401).json({
        status: "bad",
        message: `There is a product with such id in 'favorites'.`,
      });
    } else {
      try {
        await this.User.update(
          { shoppingCarts: [...user.shoppingCarts, productId] },
          { where: { id: userId } }
        );
        res.status(201).json({
          status: "ok",
          message: "The desired product successfuly was added in 'favorites'.",
          userFavorites: [...user.shoppingCarts, productId],
        });
      } catch (error) {
        res.status(404).json({ status: "bad", message: error });
      }
    }
  }
  async removeFromShoppingCartsRoute(req, res) {
    const recievedToken = req.params.token;
    const productId = req.params.productId;

    const userId = await decodeToken(recievedToken).getUserId();
    const user = await decodeToken(recievedToken).getUser();

    const productAvailibility = checkProductAvailibility(
      productId,
      user.shoppingCarts
    );
    if (!productAvailibility) {
      res.status(401).json({
        status: "bad",
        message: `There is not any product with such id in 'favorites'.`,
      });
    } else {
      try {
        const removeFromList = user.shoppingCarts.filter((id) => {
          return id !== productId;
        });
        await this.User.update(
          { favorites: removeFromList },
          { where: { id: userId } }
        );
        res.status(201).json({
          status: "ok",
          message:
            "The desired product successfuly was removed in 'favorites'.",
          userFavorites: removeFromList,
        });
      } catch (error) {
        res.status(404).json({ status: "bad", message: error });
      }
    }
  }
  // async addToColumnRoute(req, res) {
  //   const columnName = req.params.columnName;
  //   const productId = req.params.productId;
  //   const recievedToken = req.params.token;
  //   this.addToList({
  //     res,
  //     recievedToken,
  //     productId,
  //     columnName,
  //   });
  // }
  // async removeFromColumnRoute(req, res) {
  //   const columnName = req.params.columnName;
  //   const productId = req.params.productId;
  //   const recievedToken = req.params.token;

  //   this.removeFromList({
  //     res,
  //     recievedToken,
  //     productId,
  //     columnName,
  //   });
  // }
})();
