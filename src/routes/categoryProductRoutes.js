const express = require('express');
const router = express.Router();
const categoryProductController = require('../controllers/categoryProductController');

// Crear una nueva categoría
router.post('/create', categoryProductController.createCategory);

// Obtener todas las categorías
router.get('/categorieslist', categoryProductController.getCategories);

// Obtener una categoría por ID
router.get('/category/:id', categoryProductController.getCategoryById);

// Actualizar una categoría por ID
router.put('/update/:id', categoryProductController.updateCategory);

// Eliminar una categoría por ID
router.delete('/delete/:id', categoryProductController.deleteCategory);

module.exports = router;
