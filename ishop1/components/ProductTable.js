import React from "react";
import "./ProductTable.scss";
import Product from "./Product";

class ProductTable extends React.Component {
  render() {
    return (
      <table className="ProductTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price ($)</th>
            <th>Image</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {this.props.products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    );
  }
}

export default ProductTable;
