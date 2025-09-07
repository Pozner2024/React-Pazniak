//Компонент CardEdit отвечает за редактирование и добавление товаров в интернет-магазине
import React, { useState, useEffect } from "react";
import "./CardEdit.scss";

const CardEdit = ({ product, mode, cbSave, cbCancel, onChange }) => {
  const [formData, setFormData] = useState({
    name: product ? product.name : "",
    price: product ? product.price : "",
    stock: product ? product.stock : "",
  });

  const [errors, setErrors] = useState({
    nameError: "",
    priceError: "",
    stockError: "",
  });

  const [isValid, setIsValid] = useState(false);

  const validateForm = (data = formData) => {
    let nameError = "";
    let priceError = "";
    let stockError = "";
    let valid = true;

    if (!data.name.toString().trim()) {
      nameError = "Name is required";
      valid = false;
    } else if (data.name.toString().trim().length < 2) {
      nameError = "Name must be at least 2 characters";
      valid = false;
    }

    if (
      data.price === null ||
      data.price === undefined ||
      data.price === "" ||
      isNaN(data.price)
    ) {
      priceError = "Price is required";
      valid = false;
    } else if (data.price <= 0) {
      priceError = "Price must be greater than 0";
      valid = false;
    }

    if (
      data.stock === null ||
      data.stock === undefined ||
      data.stock === "" ||
      isNaN(data.stock)
    ) {
      stockError = "Stock is required";
      valid = false;
    } else if (data.stock < 0) {
      stockError = "Stock cannot be negative";
      valid = false;
    }

    setErrors({
      nameError,
      priceError,
      stockError,
    });
    setIsValid(valid);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleNameChange = (e) => {
    const newFormData = { ...formData, name: e.target.value };
    setFormData(newFormData);
    if (onChange) {
      onChange();
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value === "" ? "" : parseFloat(e.target.value);
    const newFormData = { ...formData, price: value };
    setFormData(newFormData);
    if (onChange) {
      onChange();
    }
  };

  const handleStockChange = (e) => {
    const value = e.target.value === "" ? "" : parseInt(e.target.value);
    const newFormData = { ...formData, stock: value };
    setFormData(newFormData);
    if (onChange) {
      onChange();
    }
  };

  const handleSave = () => {
    if (isValid) {
      const productData = {
        name: formData.name.toString().trim(),
        price: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
      };
      cbSave(productData);
    }
  };

  const handleCancel = () => {
    cbCancel();
  };

  const isEditMode = mode === 2;
  const isAddMode = mode === 3;

  return (
    <div className="CardEdit">
      <h3>{isEditMode ? "Edit product" : "Add new product"}</h3>
      <div className="edit-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={handleNameChange}
            className={errors.nameError ? "error" : ""}
          />
          {errors.nameError && (
            <span className="error-message">{errors.nameError}</span>
          )}
        </div>

        <div className="form-group">
          <label>Price ($):</label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handlePriceChange}
            className={errors.priceError ? "error" : ""}
            required={isAddMode}
          />
          {errors.priceError && (
            <span className="error-message">{errors.priceError}</span>
          )}
        </div>

        <div className="form-group">
          <label>Stock:</label>
          <input
            type="number"
            value={formData.stock}
            onChange={handleStockChange}
            className={errors.stockError ? "error" : ""}
          />
          {errors.stockError && (
            <span className="error-message">{errors.stockError}</span>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={handleSave}
            disabled={!isValid}
            className="save-btn"
          >
            {isEditMode ? "Save" : "Add"}
          </button>
          <button type="button" onClick={handleCancel} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardEdit;
