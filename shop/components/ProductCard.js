import React, { useState, useEffect } from "react";
import { useCart } from "../hooks/useCart";
import "./ProductCard.scss";

const ProductCard = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addProductToCart } = useCart();

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Reset quantity when product changes
  useEffect(() => {
    setQuantity(1);
  }, [product]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    const success = addProductToCart(product, quantity);
    if (success) {
      // Reset quantity after successful add
      setQuantity(1);
      // Close the modal after successful add
      onClose();
      // Optionally show success message
      console.log(`Added ${quantity} of ${product.name} to cart`);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, Math.min(value, product.stock)));
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="ProductCardOverlay" onClick={handleOverlayClick}>
      <div className="ProductCard">
        <button className="close-button" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="product-card-content">
          <div className="product-card-image">
            <img src={product.imageUrl} alt={product.name} />
          </div>

          <div className="product-card-details">
            <h2 className="product-card-title">{product.name}</h2>

            <div className="product-card-price">
              <span className="currency">$</span>
              <span className="amount">{product.price}</span>
            </div>

            <div className="product-card-description">
              <p>
                {product.description ||
                  "Premium quality product carefully selected for you."}
              </p>
            </div>

            <div className="product-card-stock">
              <span className="stock-label">Available:</span>
              <span
                className={`stock-amount ${
                  product.stock === 0 ? "out-of-stock" : ""
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </span>
            </div>

            {product.stock > 0 && (
              <div className="product-card-actions">
                <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity:</label>
                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="quantity-input"
                    />
                    <button
                      type="button"
                      onClick={increaseQuantity}
                      disabled={quantity >= product.stock}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="add-to-cart-btn"
                  disabled={product.stock === 0}
                >
                  <span className="btn-icon">🛒</span>
                  Add to Cart
                </button>
              </div>
            )}

            {product.stock === 0 && (
              <div className="out-of-stock-message">
                <span className="warning-icon">⚠️</span>
                This item is currently out of stock
              </div>
            )}

            <div className="product-card-meta">
              {product.category && (
                <div className="product-category">
                  <span className="meta-label">Category:</span>
                  <span className="meta-value">{product.category}</span>
                </div>
              )}
              {product.brand && (
                <div className="product-brand">
                  <span className="meta-label">Brand:</span>
                  <span className="meta-value">{product.brand}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

