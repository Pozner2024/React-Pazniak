//Компонент Cart отвечает за корзину покупок в интернет-магазине
import React from "react";
import Tooltip from "./Tooltip";
import "./Cart.scss";

const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="CartContainer">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <p>Your cart is empty</p>
        </div>
        <div className="empty-cart">
          <div className="empty-cart-icon">🛍️</div>
          <h3>Cart is empty</h3>
          <p>Add products from catalog to start shopping</p>
        </div>
      </div>
    );
  }

  return (
    <div className="CartContainer">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <p>
          {totalItems} {totalItems === 1 ? "item" : "items"} for $
          {totalPrice.toFixed(2)}
        </p>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.imageUrl} alt={item.name} />
              </div>

              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <div className="cart-item-price">${item.price}</div>
              </div>

              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <Tooltip text={`Remove ${item.name} from cart`} position="left">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="remove-btn"
                  >
                    ✕
                  </button>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>Total items:</span>
            <span>{totalItems}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <div className="cart-actions">
            <button className="checkout-btn">Checkout</button>
            <button onClick={onClearCart} className="clear-btn">
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
