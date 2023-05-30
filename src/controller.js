const autoBind = require("auto-bind");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("src/model/user");
const Product = require("src/model/product");
const decodeToken = require("src/middleware/decode token.js");

module.exports = class Controller {
  constructor() {
    this.User = User;
    this.Product = Product;
    autoBind(this);
  }

  checkValidationResult(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = result.array();
      const message = [];
      errors.forEach((err) => message.push(err.msg));
      res.status(400).json(message);
      return false;
    }
    return true;
  }

  bodyValdator(req, res, next) {
    if (!this.checkValidationResult(req, res)) {
      return;
    } else {
      next();
    }
  }

  sendSuccessfullyAddMessage({ res, columnName }) {
    res.status(201).json({
      status: "ok",
      message: `The desired product successfuly was added in '${columnName}'.`,
    });
  }
  sendSuccessfullyRemoveMessage({ res, columnName }) {
    res.status(201).json({
      status: "ok",
      message: `The desired product successfuly was added in '${columnName}'.`,
    });
  }

  // async getAllFromList({ res, columnName, recievedToken }) {
  //   const user = await decodeToken(recievedToken).getUser();
  //   const { firstName, lastName, email, likes, favorites, shoppingCards } =
  //     user;

  //   res.status(200).json({
  //     status: "ok",
  //     data: { firstName, lastName, email, likes, favorites, shoppingCards },
  //   });

  // }

  // async addToList({ res, recievedToken, productId, columnName }) {
  //   const user = await decodeToken(recievedToken).getUser();

  //   const productAvailibility = checkProductAvailibility(
  //     productId,
  //     columnName,
  //     user
  //   );
  //   if (productAvailibility)
  //     res.status(401).json({
  //       status: "bad",
  //       message: `There is a product with such soecifications in '${columnName}'.`,
  //     });
  //   else {
  //     switch (columnName) {
  //       case "likes":
  //         await user.update({ likes: [...user.likes, productId] });
  //         this.sendSuccessfullyAddMessage({ res, columnName });
  //         break;
  //       case "favorites":
  //         await user.update({ likes: [...user.favorites, productId] });
  //         this.sendSuccessfullyAddMessage({ res, columnName });

  //         break;
  //       case "shopping cards":
  //         await user.update({ likes: [...user.shoppingCard, productId] });
  //         this.sendSuccessfullyAddMessage({ res, columnName });
  //         break;
  //       default:
  //         res.status(403).json({
  //           status: "ok",
  //           message: `You can not add item to '${columnName}'.`,
  //         });
  //     }
  //   }
  // }

  // async removeFromList({ res, recievedToken, productId, columnName }) {
  //   const user = await decodeToken(recievedToken).getUser();
  //   const userId = await decodeToken(recievedToken).getUserId();

  //   const productAvailibility = checkProductAvailibility(
  //     productId,
  //     columnName,
  //     user
  //   );

  //   if (!productAvailibility)
  //     res.status(401).json({
  //       status: "bad",
  //       message: `There is not any product with this id in '${columnName}'.`,
  //     });
  //   else {
  //     const updatedLikesList = user.likes.filter((itemId) => {
  //       return itemId !== productId;
  //     });
  //     switch (columnName) {
  //       case "likes":
  //         this.sendSuccessfullyRemoveMessage({ res, columnName });
  //         await user.update(
  //           { likes: updatedLikesList },
  //           { where: { id: userId } }
  //         );
  //         break;
  //       case "favorites":
  //         this.sendSuccessfullyRemoveMessage({ res, columnName });
  //         await user.update(
  //           { favorites: updatedLikesList },
  //           { where: { id: userId } }
  //         );
  //         break;
  //       case "shoppingCards":
  //         this.sendSuccessfullyRemoveMessage({ res, columnName });
  //         await user.update(
  //           { shoppingCards: updatedLikesList },
  //           { where: { id: userId } }
  //         );
  //         break;
  //       default:
  //         res.status(403).json({
  //           status: "ok",
  //           message: `It is not possible to remove item from '${columnName}'. `,
  //         });
  //     }
  //   }
  // }
};
