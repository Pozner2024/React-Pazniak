import React from "react";

class Product extends React.Component {
  render() {
    return (
      <tr>
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
      </tr>
    );
  }
}

export default Product;
