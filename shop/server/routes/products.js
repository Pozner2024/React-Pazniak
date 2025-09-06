const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const { 
  getAllProducts, 
  getProductById, 
  addProduct, 
  updateProduct, 
  deleteProduct,
  updateProductStock,
  getProductReviews 
} = require('../database/database');

const router = express.Router();

// Validation middleware
const validateProduct = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('category').optional().isString(),
  body('brand').optional().isString(),
  body('description').optional().isString(),
  body('imageUrl').optional().isURL().withMessage('Image URL must be valid')
];

const validateId = [
  param('id').isInt({ min: 1 }).withMessage('Product ID must be a positive integer')
];

// Error handling middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: errors.array() 
    });
  }
  next();
};

// GET /api/products - Get all products with optional filtering
router.get('/', [
  query('category').optional().isString(),
  query('brand').optional().isString(),
  query('minPrice').optional().isFloat({ min: 0 }),
  query('maxPrice').optional().isFloat({ min: 0 }),
  query('inStock').optional().isBoolean()
], async (req, res) => {
  try {
    let products = await getAllProducts();
    
    // Apply filters
    const { category, brand, minPrice, maxPrice, inStock } = req.query;
    
    if (category) {
      products = products.filter(p => p.category && p.category.toLowerCase().includes(category.toLowerCase()));
    }
    
    if (brand) {
      products = products.filter(p => p.brand && p.brand.toLowerCase().includes(brand.toLowerCase()));
    }
    
    if (minPrice) {
      products = products.filter(p => p.price >= parseFloat(minPrice));
    }
    
    if (maxPrice) {
      products = products.filter(p => p.price <= parseFloat(maxPrice));
    }
    
    if (inStock === 'true') {
      products = products.filter(p => p.stock > 0);
    }

    // Add reviews to each product
    const productsWithReviews = await Promise.all(products.map(async (product) => {
      const reviews = await getProductReviews(product.id);
      return { ...product, reviews };
    }));
    
    res.json({
      success: true,
      count: productsWithReviews.length,
      products: productsWithReviews
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', validateId, handleValidationErrors, async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Get reviews for this product
    const reviews = await getProductReviews(product.id);
    
    res.json({
      success: true,
      product: { ...product, reviews }
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST /api/products - Add new product
router.post('/', validateProduct, handleValidationErrors, async (req, res) => {
  try {
    const newProduct = await addProduct(req.body);
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: newProduct
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// PUT /api/products/:id - Update product
router.put('/:id', [...validateId, ...validateProduct], handleValidationErrors, async (req, res) => {
  try {
    const existingProduct = await getProductById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const updatedProduct = await updateProduct(req.params.id, req.body);
    res.json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE /api/products/:id - Delete product
router.delete('/:id', validateId, handleValidationErrors, async (req, res) => {
  try {
    const existingProduct = await getProductById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const result = await deleteProduct(req.params.id);
    if (result.deleted) {
      res.json({
        success: true,
        message: 'Product deleted successfully'
      });
    } else {
      res.status(400).json({ error: 'Failed to delete product' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// PATCH /api/products/:id/stock - Update product stock
router.patch('/:id/stock', [
  ...validateId,
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer')
], handleValidationErrors, async (req, res) => {
  try {
    const existingProduct = await getProductById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    if (existingProduct.stock < req.body.quantity) {
      return res.status(400).json({ 
        error: 'Insufficient stock',
        available: existingProduct.stock,
        requested: req.body.quantity
      });
    }
    
    const result = await updateProductStock(req.params.id, req.body.quantity);
    if (result.updated) {
      const updatedProduct = await getProductById(req.params.id);
      res.json({
        success: true,
        message: 'Stock updated successfully',
        product: updatedProduct
      });
    } else {
      res.status(400).json({ error: 'Failed to update stock' });
    }
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({ error: 'Failed to update stock' });
  }
});

module.exports = router;
