import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Menu from "./Menu";
import ProductTable from "./ProductTable";
import Catalog from "./Catalog";
import Profile from "./Profile";
import Cart from "./Cart";
import Footer from "./Footer";
import "./ShopInfo.scss";

// Redux actions
import { setProducts, updateProductStock, restoreProductStock } from "../store/slices/productsSlice";
import { addToCart as addToCartAction, updateCartQuantity as updateCartQuantityAction, removeFromCart as removeFromCartAction, clearCart as clearCartAction } from "../store/slices/cartSlice";

// Redux selectors
import { selectProducts } from "../store/slices/productsSlice";
import { selectCartItems, selectCartItemsCount } from "../store/slices/cartSlice";

const ShopInfo = ({
  name,
  address,
  phone,
  email,
  website,
  products: initialProducts,
}) => {
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState("catalog");
  
  // Get data from Redux store
  const products = useSelector(selectProducts);
  const cartItems = useSelector(selectCartItems);
  const totalCartItems = useSelector(selectCartItemsCount);

  // Initialize products in Redux store
  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      dispatch(setProducts(initialProducts));
    }
  }, [dispatch, initialProducts]);

  const handleMenuSelect = (sectionId) => {
    setActiveSection(sectionId);
  };

  const addToCart = (product, quantity = 1) => {
    // Check if there's enough stock
    const currentProduct = products.find((p) => p.id === product.id);
    if (!currentProduct || currentProduct.stock < quantity) {
      console.log(
        "Not enough stock for " +
          product.name +
          ". Available: " +
          (currentProduct ? currentProduct.stock : 0) +
          ", Requested: " +
          quantity
      );
      return; // Not enough stock
    }

    // Add to cart using Redux
    dispatch(addToCartAction({ product, quantity }));
    
    // Update product stock using Redux
    dispatch(updateProductStock({ id: product.id, quantity }));
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
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
          "Not enough stock to increase quantity. Available: " +
            (currentProduct ? currentProduct.stock : 0) +
            ", Requested increase: " +
            quantityDifference
        );
        return; // Not enough stock
      }
    }

    // Update cart using Redux
    dispatch(updateCartQuantityAction({ productId, quantity: newQuantity }));

    // Update product stock using Redux
    if (quantityDifference > 0) {
      dispatch(updateProductStock({ id: productId, quantity: quantityDifference }));
    } else {
      dispatch(restoreProductStock({ id: productId, quantity: Math.abs(quantityDifference) }));
    }
  };

  const removeFromCart = (productId) => {
    // Find the item to get its quantity
    const itemToRemove = cartItems.find((item) => item.id === productId);
    if (!itemToRemove) return;

    // Return items to stock using Redux
    dispatch(restoreProductStock({ id: productId, quantity: itemToRemove.quantity }));

    // Remove from cart using Redux
    dispatch(removeFromCartAction(productId));
  };

  const clearCart = () => {
    // Return all items from cart back to stock using Redux
    cartItems.forEach((cartItem) => {
      dispatch(restoreProductStock({ id: cartItem.id, quantity: cartItem.quantity }));
    });

    // Clear the cart using Redux
    dispatch(clearCartAction());
  };

  const renderContent = () => {
    switch (activeSection) {
      case "catalog":
        return <Catalog products={products} onAddToCart={addToCart} />;
      case "profile":
        return <Profile products={products} />;
      case "cart":
        return (
          <Cart
            cartItems={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onClearCart={clearCart}
          />
        );
      case "about":
        return (
          <div className="about-section">
            <h2>About Our Gourmet Shop</h2>
            <p>
              Welcome to our premium gourmet food store! We specialize in
              bringing you the finest culinary experiences with carefully
              selected products from around the world.
            </p>
            <div className="shop-details">
              <h3>Our Story</h3>
              <p>
                Founded with a passion for exceptional food, we've been serving
                food enthusiasts for years. Our commitment to quality and
                customer satisfaction drives everything we do.
              </p>
              <h3>What We Offer</h3>
              <ul>
                <li>Premium imported delicacies</li>
                <li>Artisanal local products</li>
                <li>Seasonal specialties</li>
                <li>Custom gift baskets</li>
              </ul>
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="contact-section">
            <h2>Contact Information</h2>
            <div className="contact-info">
              <div className="contact-item">
                <h3>📍 Address</h3>
                <p>{address}</p>
              </div>
              <div className="contact-item">
                <h3>📞 Phone</h3>
                <p>{phone}</p>
              </div>
              <div className="contact-item">
                <h3>📧 Email</h3>
                <p>{email}</p>
              </div>
              <div className="contact-item">
                <h3>🌐 Website</h3>
                <p>{website}</p>
              </div>
            </div>
            <div className="hours">
              <h3>Business Hours</h3>
              <ul>
                <li>Monday - Friday: 9:00 AM - 8:00 PM</li>
                <li>Saturday: 9:00 AM - 6:00 PM</li>
                <li>Sunday: 11:00 AM - 5:00 PM</li>
              </ul>
            </div>
          </div>
        );
      case "cart":
        return (
          <div className="cart-section">
            <h2>Shopping Cart</h2>
            <p>Your cart is currently empty.</p>
            <div className="cart-placeholder">
              <div className="empty-cart">
                <span className="cart-icon">🛒</span>
                <p>Start shopping to add items to your cart!</p>
                <button
                  onClick={() => handleMenuSelect("products")}
                  className="shop-now-btn"
                >
                  Browse Products
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <ProductTable products={products} />;
    }
  };



  return (
    <div className="ShopBanner">
      <Menu
        onMenuSelect={handleMenuSelect}
        activeSection={activeSection}
        cartItemsCount={totalCartItems}
      />
      <div className="shop-header">
        <h1>{name}</h1>
        <p className="shop-tagline">
          Discover exceptional flavors from around the world
        </p>
      </div>
      <div className="shop-content">{renderContent()}</div>
      <Footer />
    </div>
  );
};

export default ShopInfo;
