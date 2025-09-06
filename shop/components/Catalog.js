import React, { useState } from "react";
import "./Catalog.scss";
import CardView from "./CardView";
import ProductCard from "./ProductCard";

const Catalog = ({ products, onAddToCart }) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showProductCard, setShowProductCard] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const selectItem = (id) => {
    setSelectedItemId(selectedItemId === id ? null : id);
  };

  const openProductCard = (product) => {
    setSelectedProduct(product);
    setShowProductCard(true);
  };

  const closeProductCard = () => {
    setShowProductCard(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product, event) => {
    event.stopPropagation();
    // Open product card instead of immediately adding to cart
    openProductCard(product);
  };

  const handleActualAddToCart = (product, quantity) => {
    if (onAddToCart) {
      // Call the parent's onAddToCart with the selected quantity
      onAddToCart(product, quantity);
    }

    // Close the product card
    closeProductCard();
  };

  const selectedItem = products.find((item) => item.id === selectedItemId);

  return (
    <div className="CatalogContainer">
      <div className="catalog-header">
        <h2>Product Catalog</h2>
        <p>Browse available products (total: {products.length})</p>
      </div>

      <div className="catalog-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className={`catalog-item ${
              product.id === selectedItemId ? "selected" : ""
            }`}
            onClick={() => openProductCard(product)}
          >
            <div className="catalog-item-image">
              <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="catalog-item-info">
              <h3 className="catalog-item-name">{product.name}</h3>
              <div className="catalog-item-price">${product.price}</div>
              <div className="catalog-item-stock">
                {product.stock > 0 ? (
                  <span className="in-stock">In stock: {product.stock}</span>
                ) : (
                  <span className="out-of-stock">Out of stock</span>
                )}
              </div>

              <button
                onClick={(e) => handleAddToCart(product, e)}
                disabled={product.stock <= 0}
                className="add-to-cart-btn"
              >
                {product.stock > 0 ? "Add to Cart" : "Out of stock"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="catalog-detail">
          <h3>Product Details</h3>
          <CardView product={selectedItem} />
        </div>
      )}

      <ProductCard
        product={selectedProduct}
        isOpen={showProductCard}
        onClose={closeProductCard}
        onAddToCart={handleActualAddToCart}
      />
    </div>
  );
};

export default Catalog;
