const Category = require('../models/CategoryProduct');
const { errorsConstants } = require("../constants/errors.constant");
const { handlerError } = require("../handlers/errors.handlers");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    // Validar que el nombre esté presente
    if (!name) {
      return handlerError(res, 400, errorsConstants.inputRequired);
    }

    // Comprobar si la categoría ya existe
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return handlerError(res, 400, errorsConstants.categoryAlreadyExists);
    }

    // Crear nueva categoría
    const newCategory = new Category({ name, description: description || '' });
    const savedCategory = await newCategory.save();

    return res.status(201).send(savedCategory);
  } catch (error) {
    console.error(error);
    return handlerError(res, 500, errorsConstants.serverError);
  }
};
exports.getCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      if (categories.length === 0) {
        return handlerError(res, 404, errorsConstants.categoriesNotFound);
      }
      return res.status(200).send(categories);
    } catch (error) {
      console.error(error);
      return handlerError(res, 500, errorsConstants.serverError);
    }
  };
  exports.getCategoryById = async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
  
      if (!category) {
        return handlerError(res, 404, errorsConstants.categoryNotFound);
      }
  
      return res.status(200).send(category);
    } catch (error) {
      console.error(error);
      return handlerError(res, 500, errorsConstants.serverError);
    }
  };
  exports.updateCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
  
      // Buscar la categoría a actualizar
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name, description },
        { new: true }  // Retorna la categoría actualizada
      );
  
      if (!updatedCategory) {
        return handlerError(res, 404, errorsConstants.categoryNotFound);
      }
  
      return res.status(200).send(updatedCategory);
    } catch (error) {
      console.error(error);
      return handlerError(res, 500, errorsConstants.serverError);
    }
  };
  exports.deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Buscar y eliminar la categoría
      const deletedCategory = await Category.findByIdAndDelete(id);
  
      if (!deletedCategory) {
        return handlerError(res, 404, errorsConstants.categoryNotFound);
      }
  
      return res.status(200).send({ msg: 'Category deleted successfully' });
    } catch (error) {
      console.error(error);
      return handlerError(res, 500, errorsConstants.serverError);
    }
  };
  