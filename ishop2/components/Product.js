import React from "react";

class Product extends React.Component {
  handleClick = () => {
    this.props.cbSelect(this.props.product.id);
  };

  render() {
    const backgroundColor = this.props.isSelected ? "yellow" : "white";
    const handleDelete = (e) => {
      e.stopPropagation();
      if (window.confirm("Вы уверены, что хотите удалить этот товар?")) {
        this.props.cbDelete(this.props.product.id);
      }
    };
    return (
      <tr style={{ backgroundColor }} onClick={this.handleClick}>
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
          <button onClick={handleDelete}>Удалить</button>
        </td>
      </tr>
    );
  }
}

export default Product;
