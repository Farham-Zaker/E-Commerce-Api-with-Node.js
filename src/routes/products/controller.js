const controller = require("src/controller.js");
const Product = require("./../../model/product");
module.exports = new (class Controller extends controller {
  async getAllProducts(req, res, next) {
    const products = await this.Product.findAll({});
    res.status(200).json(products);
  }
  async getProductById(req, res, next) {
    const products = await Product.findAll();
    console.log(products);
    try {
      const productId = req.params.id;
      const product = await this.Product.findOne({ where: { id: productId } });
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(401).json({
          status: "bad",
          message: "There is not any product with this Id!",
        });
      }
    } catch (error) {
      res.status(404).json({
        status: "bad",
        message: error,
      });
    }
  }
  async getByPageNumber(req, res, next) {
    const limit = Number(req.params.limit);
    const pageNumber = Number(req.params.pageNumber);

    let offset = limit * (pageNumber - 1);
    const allProducts = await this.Product.findAll({
      limit,
      offset,
    });
    res.status(200).send(allProducts);
  }
})();
