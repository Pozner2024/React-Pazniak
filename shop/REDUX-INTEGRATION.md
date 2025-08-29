# Redux Integration Guide

## Overview

This project now includes Redux for state management using Redux Toolkit. The Redux store manages:

- **Products**: Product catalog, stock management, CRUD operations
- **Cart**: Shopping cart items, quantities, and totals

## File Structure

```
shop/
├── store/
│   ├── store.js              # Redux store configuration
│   └── slices/
│       ├── productsSlice.js  # Products state management
│       └── cartSlice.js      # Cart state management
├── hooks/
│   ├── useProducts.js        # Custom hook for products
│   └── useCart.js            # Custom hook for cart
└── components/
    └── ...                   # Components using Redux
```

## Redux Store Structure

### Products State
```javascript
{
  products: [],      // Array of product objects
  loading: false,    // Loading state for async operations
  error: null        // Error messages
}
```

### Cart State
```javascript
{
  items: [],         // Array of cart items with quantities
  total: 0,          // Total cart value
  itemsCount: 0      // Total number of items in cart
}
```

## Using Redux in Components

### Method 1: Direct Redux Hooks

```javascript
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { selectProducts } from '../store/slices/productsSlice';

const MyComponent = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  return (
    // Your component JSX
  );
};
```

### Method 2: Custom Hooks (Recommended)

```javascript
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';

const MyComponent = () => {
  const { cartItems, addProductToCart, removeProduct } = useCart();
  const { products, createProduct, editProduct } = useProducts();

  const handleAddToCart = (product) => {
    const success = addProductToCart(product, 1);
    if (!success) {
      alert('Not enough stock!');
    }
  };

  return (
    // Your component JSX
  );
};
```

## Available Actions

### Products Actions
- `setProducts(products)` - Initialize products
- `addProduct(productData)` - Add new product
- `updateProduct({ id, updatedProduct })` - Update existing product
- `deleteProduct(id)` - Remove product
- `updateProductStock({ id, quantity })` - Reduce stock
- `restoreProductStock({ id, quantity })` - Increase stock

### Cart Actions
- `addToCart({ product, quantity })` - Add item to cart
- `updateCartQuantity({ productId, quantity })` - Update item quantity
- `removeFromCart(productId)` - Remove item from cart
- `clearCart()` - Empty cart

## Available Selectors

### Products Selectors
- `selectProducts(state)` - Get all products
- `selectProductsLoading(state)` - Get loading state
- `selectProductsError(state)` - Get error state
- `selectProductById(state, id)` - Get specific product

### Cart Selectors
- `selectCartItems(state)` - Get cart items
- `selectCartTotal(state)` - Get cart total value
- `selectCartItemsCount(state)` - Get total items count
- `selectCartItemById(state, id)` - Get specific cart item

## Custom Hooks API

### useProducts Hook
```javascript
const {
  products,           // Product array
  loading,            // Loading state
  error,              // Error state
  initializeProducts, // Function to set initial products
  createProduct,      // Function to add product
  editProduct,        // Function to update product
  removeProduct,      // Function to delete product
  getProductById      // Function to find product by ID
} = useProducts();
```

### useCart Hook
```javascript
const {
  cartItems,              // Cart items array
  cartTotal,              // Total cart value
  cartItemsCount,         // Total items count
  addProductToCart,       // Function to add to cart
  updateQuantity,         // Function to update quantity
  removeProduct,          // Function to remove from cart
  clearCartAndRestoreStock // Function to clear cart
} = useCart();
```

## Migration Notes

1. **State Management**: All cart and products state is now managed by Redux
2. **Stock Management**: Stock updates are automatically handled when items are added/removed from cart
3. **Performance**: Components re-render only when their specific data changes
4. **Debugging**: Use Redux DevTools for debugging state changes

## Best Practices

1. **Use Custom Hooks**: Prefer `useCart()` and `useProducts()` over direct Redux hooks
2. **Error Handling**: Check return values from cart operations for stock validation
3. **Component Separation**: Keep presentation and logic separate
4. **Memoization**: Use React.memo for components that don't need frequent re-renders

## Example Usage

```javascript
// Adding product to cart with stock validation
const MyComponent = () => {
  const { addProductToCart } = useCart();
  
  const handleAddToCart = (product) => {
    const success = addProductToCart(product, 2);
    if (!success) {
      // Handle insufficient stock
      toast.error('Not enough stock available!');
    } else {
      toast.success('Added to cart!');
    }
  };
  
  return (
    <button onClick={() => handleAddToCart(product)}>
      Add to Cart
    </button>
  );
};
```

This Redux integration provides a robust foundation for state management while maintaining clean, reusable code patterns.
