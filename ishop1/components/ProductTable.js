import React from "react";
import "./ProductTable.scss";
import Products from "./Products";

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
          <Products products={this.props.products} />
        </tbody>
      </table>
    );
  }
}

export default ProductTable;
