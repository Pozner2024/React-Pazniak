import React from "react";
import "./ProductTable.scss";
import Product from "./Product";

class ProductTable extends React.Component {
  state = {
    products: this.props.products,
    selectedItem: "",
  };

  selectItem = (id) => {
    this.setState({ selectedItem: id });
  };

  deleteItem = (deletedId) => {
    const newProducts = this.state.products.filter(
      (product) => product.id !== deletedId
    );
    this.setState({ products: newProducts });
  };

  render() {
    return (
      <table className="ProductTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price ($)</th>
            <th>Image</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.products.map((product) => (
            <Product
              key={product.id}
              product={product}
              isSelected={product.id === this.state.selectedItem}
              cbSelect={this.selectItem}
              cbDelete={this.deleteItem}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default ProductTable;
