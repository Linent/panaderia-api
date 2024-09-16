const Order = require('../models/Order');

const { errorsConstants } = require('../constants/errors.constant');
const { handlerError } = require('../handlers/errors.handlers');

exports.createSale = async (req, res) => {
  try {
    const { products, total } = req.body;

    // Verificar que existan productos y que el total sea válido
    if (!products || products.length === 0) {
      return handlerError(res, 400, errorsConstants.invalidProduct);
    }

    if (total <= 0 || isNaN(total)) {
      return handlerError(res, 400, errorsConstants.invalidPrice);
    }

    // Crear nueva orden de venta
    const order = new Order({ products, total });
    const newOrder = await order.save();

    // Responder con el nuevo pedido creado
    return res.status(201).send(newOrder);
  } catch (error) {
    console.error(error);
    handlerError(res, 500, errorsConstants.serverError);
  }
};

exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate('products.product');

    // Verificar si hay ventas
    if (!sales || sales.length === 0) {
      return handlerError(res, 404, errorsConstants.salesNotFound);
    }

    // Responder con las ventas obtenidas
    return res.status(200).send(sales);
  } catch (error) {
    console.error(error);
    return handlerError(res, 500, errorsConstants.serverError);
  }
};

