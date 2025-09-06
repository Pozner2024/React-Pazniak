import React, { useState } from "react";
import MobileMenu from "./MobileMenu";
import "./Menu.scss";

const Menu = ({ onMenuSelect, activeSection, cartItemsCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: "catalog", label: "Catalog" },
    { id: "reviews", label: "Reviews" },
    { id: "profile", label: "Profile" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact" },
    { id: "cart", label: "Shopping Cart" },
  ];

  const handleMenuClick = (itemId) => {
    if (onMenuSelect) {
      onMenuSelect(itemId);
    }
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="Menu">
      <div className="menu-container">
        <div className="menu-brand">
          <h2>🍽️ Gourmet Shop</h2>
        </div>

        <ul className="menu-items desktop-menu">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`menu-item ${
                activeSection === item.id ? "active" : ""
              }`}
            >
              <button
                onClick={() => handleMenuClick(item.id)}
                className="menu-link"
              >
                <span className="menu-label">{item.label}</span>
                {item.id === "cart" && cartItemsCount > 0 && (
                  <span className="cart-badge">{cartItemsCount}</span>
                )}
              </button>
            </li>
          ))}
        </ul>

        <MobileMenu
          isOpen={isMenuOpen}
          onToggle={toggleMobileMenu}
          menuItems={menuItems}
          activeSection={activeSection}
          onMenuSelect={onMenuSelect}
          cartItemsCount={cartItemsCount}
        />
      </div>
    </nav>
  );
};

export default Menu;
