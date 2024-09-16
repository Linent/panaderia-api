const Product = require("../models/Product");
const { errorsConstants } = require("../constants/errors.constant");
const { handlerError } = require("../handlers/errors.handlers");
const Category = require("../models/CategoryProduct");

exports.createProducto = async (req, res) => {
  try {
    const { name, stock, description, categoryId, netPrice, grossPrice } = req.body;
    // Validar si la categoría proporcionada existe
    const category = await Category.findById(categoryId);
    if (!category) return handlerError(res, 404, errorsConstants.inputRequired);
    if (!name || !category || !netPrice || !grossPrice)
      return handlerError(res, 400, errorsConstants.inputRequired);
    const Producto = new Product({
      name,
      stock,
      description,
      category: categoryId,
      netPrice, 
      grossPrice
    });
    const newProduct = await Producto.save();
    return res.status(201).send(newProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Error al crear el producto" });
  }
};
exports.index = async (req, res) => {
  try {
    const productId = req.params;
    if (!productId) return handlerError(res, 400, errorsConstants.inputIdRequired);
    const product = await Product.findById(productId);
    return res.status(200).send(product);
  } catch (error) {
      console.log(error);  
    return handlerError(res, 500, errorsConstants.serverError);
  }
};
exports.updateProductStatus = async (req, res) => {
  try {
    const productId = req.params;
    const { status } = req.body;

    // Validar si el status proporcionado es válido
    const validStatuses = [
      "active",
      "inactive",
      "out_of_stock",
      "discontinued",
    ];
    if (!validStatuses.includes(status)) {
      return handlerError(res, 400, errorsConstants.invalidProductStatus);
    }

    // Actualizar el status del producto
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { status },
      { new: true }
    );

    if (!updatedProduct) {
      return handlerError(res, 404, errorsConstants.productNotFound);
    }
    return res.status(200).send(updatedProduct);
  } catch (error) {
    console.error(error);
    return handlerError(res, 500, errorsConstants.serverError);
  }
};
exports.getProducts = async (req, res) => {
  try {
    //const products = await Product.find().populate('category');
    const products = await Product.find().populate('category', 'name');
        if (products.length === 0) {
      return handlerError(res, 404, errorsConstants.noProductsFound);
    }
    return res.status(200).send(products);
  } catch (error) {
    console.error(error);
    return handlerError(res, 500, errorsConstants.serverError);
  }
};
/*
 exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) return;
    return res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error al obtener los productos" });
  }
}; 
*/
exports.updateProduct = async (req, res) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { name, netPrice, grossPrice, stock, category, description, status } = req.body;

    // Extraer el ID del producto desde los parámetros de la solicitud
    const productId = req.params._id;
    // Realizar la actualización con findByIdAndUpdate
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        netPrice,
        grossPrice,
        stock,
        category,
        description,
        status
      },
      { new: true, runValidators: true } // `new: true` para retornar el documento actualizado
    );

    // Verificar si el producto fue encontrado y actualizado
    if (!updatedProduct) {
      return handlerError(res, 404, errorsConstants.productNotFound);
    }

    // Enviar el producto actualizado
    return res.status(200).send(updatedProduct);
  } catch (error) {
    console.error(error);
    return handlerError(res, 500, errorsConstants.serverError);
  }
};

