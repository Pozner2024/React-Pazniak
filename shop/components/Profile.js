//Компонент Profile отвечает за административную панель управления магазином.
import React from "react";
import ProductTable from "./ProductTable";
import "./Profile.scss";

const Profile = ({
  products,
  onDataChange = () => {},
  onDataSave = () => {},
  hasUnsavedChanges = false,
}) => {
  return (
    <div className="ProfileContainer">
      <div className="profile-header">
        <h2>Admin Profile</h2>
        <p>Product management and store settings</p>
      </div>

      <div className="profile-content">
        <div className="admin-info">
          <div className="admin-card">
            <div className="admin-details">
              <h3>Store Administrator</h3>
              <p>Gourmet Shop Manager</p>
              <div className="admin-stats">
                <div className="stat">
                  <span className="stat-number">{products.length}</span>
                  <span className="stat-label">Products in catalog</span>
                </div>
                <div className="stat">
                  <span className="stat-number">
                    {products.reduce((sum, p) => sum + p.stock, 0)}
                  </span>
                  <span className="stat-label">Items in stock</span>
                </div>
                <div className="stat">
                  <span className="stat-number">
                    $
                    {products
                      .reduce((sum, p) => sum + p.price * p.stock, 0)
                      .toFixed(2)}
                  </span>
                  <span className="stat-label">Total value</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="products-management">
          <h3>Product Management</h3>
          {hasUnsavedChanges && (
            <div className="unsaved-warning">
              ⚠️ You have unsaved changes in product data
            </div>
          )}
          <ProductTable
            products={products}
            onDataChange={onDataChange}
            onDataSave={onDataSave}
            hasUnsavedChanges={hasUnsavedChanges}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
