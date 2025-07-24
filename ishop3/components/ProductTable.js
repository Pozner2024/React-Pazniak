import React from "react";
import "./ProductTable.scss";
import Product from "./Product";
import CardView from "./CardView";
import CardEdit from "./CardEdit";

class ProductTable extends React.Component {
  state = {
    products: this.props.products,
    selectedItemId: null,
    lastSelectedItemId: null,
    mode: 0, // 0 - no card, 1 - view, 2 - edit, 3 - add
    hasChanges: false,
  };

  selectItem = (id) => {
    if (this.state.hasChanges) {
      return;
    }

    this.setState({
      selectedItemId: id,
      mode: 1,
      hasChanges: false,
    });
  };

  editItem = (id) => {
    if (this.state.hasChanges) {
      return;
    }

    this.setState({
      selectedItemId: id,
      lastSelectedItemId: this.state.selectedItemId,
      mode: 2,
      hasChanges: false,
    });
  };

  addNewItem = () => {
    if (this.state.hasChanges) {
      return;
    }

    this.setState({
      selectedItemId: null,
      mode: 3,
      hasChanges: false,
    });
  };

  deleteItem = (deletedId) => {
    const newProducts = this.state.products.filter(
      (product) => product.id !== deletedId
    );
    this.setState({
      products: newProducts,
      selectedItemId: null,
      mode: 0,
      hasChanges: false,
    });
  };

  saveItem = (productData) => {
    if (this.state.mode === 2) {
      // Edit mode
      const updatedProducts = this.state.products.map((product) =>
        product.id === this.state.selectedItemId
          ? { ...product, ...productData }
          : product
      );
      this.setState({
        products: updatedProducts,
        selectedItemId:
          this.state.lastSelectedItemId !== null &&
          this.state.lastSelectedItemId !== undefined
            ? this.state.lastSelectedItemId
            : this.state.selectedItemId,
        lastSelectedItemId: null,
        mode: 1,
        hasChanges: false,
      });
    } else if (this.state.mode === 3) {
      // Add mode
      const newProduct = {
        id: Math.max(...this.state.products.map((p) => p.id)) + 1,
        ...productData,
        imageUrl: "https://via.placeholder.com/150x150?text=New+Product",
      };
      this.setState({
        products: [...this.state.products, newProduct],
        selectedItemId: newProduct.id,
        lastSelectedItemId: null,
        mode: 1,
        hasChanges: false,
      });
    }
  };

  cancelEdit = () => {
    this.setState({
      selectedItemId:
        this.state.lastSelectedItemId !== null &&
        this.state.lastSelectedItemId !== undefined
          ? this.state.lastSelectedItemId
          : this.state.selectedItemId,
      lastSelectedItemId: null,
      mode:
        (this.state.lastSelectedItemId !== null &&
          this.state.lastSelectedItemId !== undefined) ||
        this.state.selectedItemId
          ? 1
          : 0,
      hasChanges: false,
    });
  };

  onFormChange = () => {
    this.setState({ hasChanges: true });
  };

  render() {
    const selectedItem = this.state.products.find(
      (item) => item.id === this.state.selectedItemId
    );

    return (
      <div className="ProductTableContainer">
        <div className="table-section">
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
                  isSelected={
                    product.id === this.state.selectedItemId &&
                    this.state.mode === 1
                  }
                  mode={this.state.mode}
                  hasChanges={this.state.hasChanges}
                  cbSelect={this.selectItem}
                  cbEdit={this.editItem}
                  cbDelete={this.deleteItem}
                />
              ))}
            </tbody>
          </table>

          <div className="table-actions">
            <button
              onClick={this.addNewItem}
              disabled={this.state.hasChanges}
              className="new-btn"
            >
              New Product
            </button>
          </div>

          {/* Card now below the table and button */}
          {selectedItem && this.state.mode === 1 && (
            <CardView product={selectedItem} />
          )}

          {this.state.mode === 2 && (
            <CardEdit
              key={this.state.selectedItemId}
              product={selectedItem}
              mode={this.state.mode}
              cbSave={this.saveItem}
              cbCancel={this.cancelEdit}
              onChange={this.onFormChange}
            />
          )}

          {this.state.mode === 3 && (
            <CardEdit
              key="new"
              product={null}
              mode={this.state.mode}
              cbSave={this.saveItem}
              cbCancel={this.cancelEdit}
              onChange={this.onFormChange}
            />
          )}
        </div>
      </div>
    );
  }
}

export default ProductTable;
