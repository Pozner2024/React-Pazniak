import React from "react";
import "./CardEdit.scss";

class CardEdit extends React.Component {
  state = {
    name: this.props.product ? this.props.product.name : "",
    price: this.props.product ? this.props.product.price : 0,
    stock: this.props.product ? this.props.product.stock : 0,
    nameError: "",
    priceError: "",
    stockError: "",
    isValid: false,
  };

  nameChange = (e) => {
    this.setState({ name: e.target.value }, () => {
      this.validateForm();
      this.props.onChange && this.props.onChange();
    });
  };

  priceChange = (e) => {
    const value = parseFloat(e.target.value);
    this.setState({ price: value }, () => {
      this.validateForm();
      this.props.onChange && this.props.onChange();
    });
  };

  stockChange = (e) => {
    const value = parseInt(e.target.value);
    this.setState({ stock: value }, () => {
      this.validateForm();
      this.props.onChange && this.props.onChange();
    });
  };

  priceFocus = (e) => {
    if (this.state.price === 0) {
      this.setState({ price: "" });
    }
  };

  validateForm = () => {
    let nameError = "";
    let priceError = "";
    let stockError = "";
    let isValid = true;

    if (!this.state.name.trim()) {
      nameError = "Name is required";
      isValid = false;
    } else if (this.state.name.trim().length < 2) {
      nameError = "Name must be at least 2 characters";
      isValid = false;
    }

    const { mode } = this.props;
    const isEditMode = mode === 2;
    const isAddMode = mode === 3;

    if (isAddMode) {
      if (
        this.state.price === null ||
        this.state.price === undefined ||
        this.state.price === "" ||
        isNaN(this.state.price)
      ) {
        priceError = "Price is required";
        isValid = false;
      } else if (this.state.price <= 0) {
        priceError = "Price must be greater than 0";
        isValid = false;
      }
    } else {
      if (this.state.price <= 0) {
        priceError = "Price must be greater than 0";
        isValid = false;
      }
    }

    if (this.state.stock < 0) {
      stockError = "Stock cannot be negative";
      isValid = false;
    }

    this.setState({
      nameError,
      priceError,
      stockError,
      isValid,
    });
  };

  save = () => {
    if (this.state.isValid) {
      const productData = {
        name: this.state.name.trim(),
        price: this.state.price,
        stock: this.state.stock,
      };
      this.props.cbSave(productData);
    }
  };

  cancel = () => {
    this.props.cbCancel();
  };

  render() {
    const { mode } = this.props;
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
              value={this.state.name}
              onChange={this.nameChange}
              className={this.state.nameError ? "error" : ""}
            />
            {this.state.nameError && (
              <span className="error-message">{this.state.nameError}</span>
            )}
          </div>

          <div className="form-group">
            <label>Price ($):</label>
            <input
              type="number"
              step="0.01"
              value={this.state.price}
              onChange={this.priceChange}
              className={this.state.priceError ? "error" : ""}
              required={isAddMode}
              onFocus={this.priceFocus}
            />
            {this.state.priceError && (
              <span className="error-message">{this.state.priceError}</span>
            )}
          </div>

          <div className="form-group">
            <label>Stock:</label>
            <input
              type="number"
              value={this.state.stock}
              onChange={this.stockChange}
              className={this.state.stockError ? "error" : ""}
            />
            {this.state.stockError && (
              <span className="error-message">{this.state.stockError}</span>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={this.save}
              disabled={!this.state.isValid}
              className="save-btn"
            >
              {isEditMode ? "Save" : "Add"}
            </button>
            <button type="button" onClick={this.cancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CardEdit;
