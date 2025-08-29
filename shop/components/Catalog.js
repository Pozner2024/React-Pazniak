import React, { useState } from "react";
import "./Catalog.scss";
import CardView from "./CardView";
import ProductCard from "./ProductCard";

const Catalog = ({ products, onAddToCart }) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showProductCard, setShowProductCard] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hiddenProducts, setHiddenProducts] = useState(new Set());
  const [removingProducts, setRemovingProducts] = useState(new Set());

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
    event.stopPropagation(); // Prevent item selection when clicking the button
    if (onAddToCart) {
      onAddToCart(product);

      // Start removal animation
      setRemovingProducts((prev) => new Set([...prev, product.id]));

      // Hide the product card after animation completes
      setTimeout(() => {
        setHiddenProducts((prev) => new Set([...prev, product.id]));
        setRemovingProducts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(product.id);
          return newSet;
        });
      }, 500); // Match the CSS transition duration
    }
  };

  const selectedItem = products.find((item) => item.id === selectedItemId);

  return (
    <div className="CatalogContainer">
      <div className="catalog-header">
        <h2>Product Catalog</h2>
        <p>
          Browse available products (total:{" "}
          {products.filter((product) => !hiddenProducts.has(product.id)).length}
          )
        </p>
      </div>

      <div className="catalog-grid">
        {products
          .filter((product) => !hiddenProducts.has(product.id))
          .map((product) => (
            <div
              key={product.id}
              className={`catalog-item ${
                product.id === selectedItemId ? "selected" : ""
              } ${removingProducts.has(product.id) ? "removing" : ""}`}
              onClick={() =>
                !removingProducts.has(product.id) && openProductCard(product)
              }
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
                  disabled={
                    product.stock <= 0 || removingProducts.has(product.id)
                  }
                  className="add-to-cart-btn"
                >
                  {removingProducts.has(product.id)
                    ? "Adding..."
                    : product.stock > 0
                    ? "Add to Cart"
                    : "Out of stock"}
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Product detail view */}
      {selectedItem && (
        <div className="catalog-detail">
          <h3>Product Details</h3>
          <CardView product={selectedItem} />
        </div>
      )}

      {/* Product Card Modal */}
      <ProductCard
        product={selectedProduct}
        isOpen={showProductCard}
        onClose={closeProductCard}
      />
    </div>
  );
};

export default Catalog;
