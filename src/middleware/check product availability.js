const Product = require("src/model/product.js");
const User = require("src/model/user.js");
module.exports = (productId, productList) => {
  // const checkAvailibility = (list) => {
  //   return list.filter((item) => {
  //     console.log("00",productId)
  //     return item === productId;
  //   });
  // };
  // console.log(columnName)
  // switch (columnName) {
  //   case "likes":
  //     return checkAvailibility(user.likes).length === 0 ? false : true;
  //   case "favorites":
  //     return checkAvailibility(user.favorites).length === 0 ? false : true;
  //   case "shoppingCards":
  //     return checkAvailibility(user.shoppingCards).length === 0 ? false : true;
  //     break;
  // }
  const [checkAvailibility] = productList.filter((item) => {
    return item === productId;
  });
  if (checkAvailibility) {
    return true;
  } else {
    return false;
  }
};
