import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, searchProducts } from '../controllers/productController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// Route to get all products
router.get('/', protect, getProducts);

// Route to search products by name
router.get('/search', protect, [
  query('q').notEmpty().withMessage('Search term is required')
], searchProducts);

// Route to get a product by its ID
router.get('/:id', protect, [
  param('id').isInt().withMessage('Product ID must be an integer')
], getProductById);

// Route to create a new product
router.post('/', protect, [
  body('name').notEmpty().withMessage('Product name is required'),
  body('price').isNumeric().withMessage('Price must be a number')
], createProduct);

// Route to update an existing product
router.put('/:id', protect, [
  param('id').isInt().withMessage('Product ID must be an integer'),
  body('name').optional().notEmpty().withMessage('Product name cannot be empty'),
  body('price').optional().isNumeric().withMessage('Price must be a number')
], updateProduct);

// Route to delete a product by its ID
router.delete('/:id', protect, [
  param('id').isInt().withMessage('Product ID must be an integer')
], deleteProduct);

export default router;