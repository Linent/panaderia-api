const Courtesy = require('../models/Courtesy');
const Product = require('../models/Product');
const { errorsConstants } = require("../constants/errors.constant");
const { handlerError } = require("../handlers/errors.handlers");

exports.createCourtesy = async (req, res) => {
  try {
    //const user = req.user;
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return handlerError(res, 404, errorsConstants.productNotFound);
    }

    if (product.stock < quantity) {
      return handlerError(res, 400, errorsConstants.insufficientStock);
    }
    // Reducir stock del producto
    product.stock -= quantity;
    await product.save();

    const newCourtesy = new Courtesy({ product: productId, quantity });
    const newC = await newCourtesy.save();

    return res.status(201).send(newC);
  } catch (error) {
    console.error(error);
    handlerError(res, 500, errorsConstants.serverError);
  }
};