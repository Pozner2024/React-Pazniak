import React from "react";
import "./MobileMenu.scss";

const MobileMenu = ({
  isOpen,
  onToggle,
  menuItems,
  activeSection,
  onMenuSelect,
  cartItemsCount = 0,
  hasUnsavedChanges = false,
}) => {
  const handleMenuClick = (itemId) => {
    if (onMenuSelect) {
      onMenuSelect(itemId);
    }
    onToggle();
  };

  return (
    <div className="mobile-menu-wrapper">

      <button
        className="mobile-menu-toggle"
        onClick={onToggle}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span className={`hamburger ${isOpen ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>


      {isOpen && <div className="mobile-menu-overlay" onClick={onToggle} />}


      <nav className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <h3>Menu</h3>
          {hasUnsavedChanges && (
            <span className="mobile-unsaved-indicator" title="You have unsaved changes">
              ● Unsaved changes
            </span>
          )}
          <button
            className="mobile-menu-close"
            onClick={onToggle}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <ul className="mobile-menu-items">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`mobile-menu-item ${
                activeSection === item.id ? "active" : ""
              }`}
            >
              <button
                onClick={() => handleMenuClick(item.id)}
                className="mobile-menu-link"
              >
                <span className="mobile-menu-label">{item.label}</span>
                {item.id === "cart" && cartItemsCount > 0 && (
                  <span className="mobile-cart-badge">{cartItemsCount}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;
