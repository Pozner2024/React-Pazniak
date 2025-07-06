import React from "react";

class Products extends React.Component {
  render() {
    return this.props.products.map((product) => (
      <tr key={product.id}>
        <td>{product.name}</td>
        <td>{product.price.toFixed(2)}</td>
        <td>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="ProductTableImage"
          />
        </td>
        <td>{product.stock}</td>
      </tr>
    ));
  }
}

export default Products;
