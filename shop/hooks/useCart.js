import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateCartQuantity, removeFromCart, clearCart } from '../store/slices/cartSlice';
import { updateProductStock, restoreProductStock } from '../store/slices/productsSlice';
import { selectCartItems, selectCartTotal, selectCartItemsCount } from '../store/slices/cartSlice';
import { selectProducts } from '../store/slices/productsSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const cartItemsCount = useSelector(selectCartItemsCount);
  const products = useSelector(selectProducts);

  const addProductToCart = (product, quantity = 1) => {
    // Check if there's enough stock
    const currentProduct = products.find((p) => p.id === product.id);
    if (!currentProduct || currentProduct.stock < quantity) {
      console.log(
        `Not enough stock for ${product.name}. Available: ${
          currentProduct ? currentProduct.stock : 0
        }, Requested: ${quantity}`
      );
      return false; // Not enough stock
    }

    // Add to cart using Redux
    dispatch(addToCart({ product, quantity }));
    
    // Update product stock using Redux
    dispatch(updateProductStock({ id: product.id, quantity }));
    return true;
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeProduct(productId);
      return;
    }

    // Find current cart item to calculate difference
    const currentCartItem = cartItems.find((item) => item.id === productId);
    if (!currentCartItem) return;

    const quantityDifference = newQuantity - currentCartItem.quantity;

    // If increasing quantity, check stock availability
    if (quantityDifference > 0) {
      const currentProduct = products.find((p) => p.id === productId);
      if (!currentProduct || currentProduct.stock < quantityDifference) {
        console.log(
          `Not enough stock to increase quantity. Available: ${
            currentProduct ? currentProduct.stock : 0
          }, Requested increase: ${quantityDifference}`
        );
        return false; // Not enough stock
      }
    }

    // Update cart using Redux
    dispatch(updateCartQuantity({ productId, quantity: newQuantity }));

    // Update product stock using Redux
    if (quantityDifference > 0) {
      dispatch(updateProductStock({ id: productId, quantity: quantityDifference }));
    } else {
      dispatch(restoreProductStock({ id: productId, quantity: Math.abs(quantityDifference) }));
    }
    return true;
  };

  const removeProduct = (productId) => {
    // Find the item to get its quantity
    const itemToRemove = cartItems.find((item) => item.id === productId);
    if (!itemToRemove) return;

    // Return items to stock using Redux
    dispatch(restoreProductStock({ id: productId, quantity: itemToRemove.quantity }));

    // Remove from cart using Redux
    dispatch(removeFromCart(productId));
  };

  const clearCartAndRestoreStock = () => {
    // Return all items from cart back to stock using Redux
    cartItems.forEach((cartItem) => {
      dispatch(restoreProductStock({ id: cartItem.id, quantity: cartItem.quantity }));
    });

    // Clear the cart using Redux
    dispatch(clearCart());
  };

  return {
    cartItems,
    cartTotal,
    cartItemsCount,
    addProductToCart,
    updateQuantity,
    removeProduct,
    clearCartAndRestoreStock,
  };
};
