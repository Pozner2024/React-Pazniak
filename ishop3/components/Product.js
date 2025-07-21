import React from "react";

class Product extends React.Component {
  handleClick = () => {
    // If in edit or add mode, ignore click
    if (this.props.mode === 2 || this.props.mode === 3) {
      return;
    }
    this.props.cbSelect(this.props.product.id);
  };

  handleEdit = (e) => {
    e.stopPropagation();
    this.props.cbEdit(this.props.product.id);
  };

  handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this product?")) {
      this.props.cbDelete(this.props.product.id);
    }
  };

  render() {
    const backgroundColor = this.props.isSelected ? "yellow" : "white";
    const isDisabled = this.props.mode === 2 || this.props.mode === 3;

    return (
      <tr
        style={{ backgroundColor }}
        onClick={this.handleClick}
        className={isDisabled ? "disabled" : ""}
      >
        <td>{this.props.product.name}</td>
        <td>{this.props.product.price.toFixed(2)}</td>
        <td>
          <img
            src={this.props.product.imageUrl}
            alt={this.props.product.name}
            className="ProductTableImage"
          />
        </td>
        <td>{this.props.product.stock}</td>
        <td>
          <button
            onClick={this.handleEdit}
            disabled={isDisabled}
            className="edit-btn"
          >
            Edit
          </button>
          <button
            onClick={this.handleDelete}
            disabled={isDisabled}
            className="delete-btn"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default Product;
