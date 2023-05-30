const controller = require("src/controller.js");
const multer = require("multer");
module.exports = new (class Controller extends controller {
  async addProducRoute(req, res, next) {
    const product = await this.Product.findOne({
      where: { name: req.body.name },
    });
    if (product) {
      res.status(404).json({
        status: "bad",
        message: "A product is already exist with same name.",
      });
    } else {
      const newProduct = await this.Product.create(req.body);
      await newProduct.save();
      res.status(201).json({
        status: "ok",
        message: "Your request successfully is done.",
      });
    }
  }
  async deleteProductRoute(req, res) {
    const productId = req.params.id;
    try {
      const product = await this.Product.findOne({
        where: { id: productId },
      });
      if (product) {
        await product.destroy();
        res.status(202).json({
          status: "ok",
          message: "Desired Product is successfuly removed.",
        });
      } else {
        res.status(404).json({
          status: "bad",
          message: "The Id you sent is not correct.",
        });
      }
    } catch (error) {
      res.status(404).json({
        status: "bad",
        message: error,
      });
    }
  }
  async updateProductRoute(req, res) {
    const productId = req.params.id;
    const product = await this.Product.findOne({ where: { id: productId } });
    try {
      if (product) {
        res.status(202).json({
          status: "ok",
          message: "Desired Product is successfuly updated.",
        });
        product.update(req.body, { where: { id: product } });
      } else {
        res.status(404).json({
          status: "bad",
          message: "The Id you sent is not correct.",
        });
      }
    } catch (error) {
      res.status(404).json({
        status: "bad",
        message: error,
      });
    }
  }
})();
