import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "../store/slices/cartSlice";
import {
  updateProductStock,
  restoreProductStock,
} from "../store/slices/productsSlice";
import {
  selectCartItems,
  selectCartTotal,
  selectCartItemsCount,
} from "../store/slices/cartSlice";
import { selectProducts } from "../store/slices/productsSlice";

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const cartItemsCount = useSelector(selectCartItemsCount);
  const products = useSelector(selectProducts);

  const addProductToCart = (product, quantity = 1) => {
    const currentProduct = products.find((p) => p.id === product.id);
    if (!currentProduct || currentProduct.stock < quantity) {
      console.log(
        `Not enough stock for ${product.name}. Available: ${
          currentProduct ? currentProduct.stock : 0
        }, Requested: ${quantity}`
      );
      return false;
    }

    dispatch(addToCart({ product, quantity }));

    dispatch(updateProductStock({ id: product.id, quantity }));
    return true;
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeProduct(productId);
      return;
    }

    const currentCartItem = cartItems.find((item) => item.id === productId);
    if (!currentCartItem) return;

    const quantityDifference = newQuantity - currentCartItem.quantity;

    if (quantityDifference > 0) {
      const currentProduct = products.find((p) => p.id === productId);
      if (!currentProduct || currentProduct.stock < quantityDifference) {
        console.log(
          `Not enough stock to increase quantity. Available: ${
            currentProduct ? currentProduct.stock : 0
          }, Requested increase: ${quantityDifference}`
        );
        return false;
      }
    }

    dispatch(updateCartQuantity({ productId, quantity: newQuantity }));

    if (quantityDifference > 0) {
      dispatch(
        updateProductStock({ id: productId, quantity: quantityDifference })
      );
    } else {
      dispatch(
        restoreProductStock({
          id: productId,
          quantity: Math.abs(quantityDifference),
        })
      );
    }
    return true;
  };

  const removeProduct = (productId) => {
    const itemToRemove = cartItems.find((item) => item.id === productId);
    if (!itemToRemove) return;

    dispatch(
      restoreProductStock({ id: productId, quantity: itemToRemove.quantity })
    );

    dispatch(removeFromCart(productId));
  };

  const clearCartAndRestoreStock = () => {
    cartItems.forEach((cartItem) => {
      dispatch(
        restoreProductStock({ id: cartItem.id, quantity: cartItem.quantity })
      );
    });

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
