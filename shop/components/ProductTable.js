import React, { useState } from "react";
import "./ProductTable.scss";
import Product from "./Product";
import CardView from "./CardView";
import CardEdit from "./CardEdit";

const ProductTable = ({
  products: initialProducts,
  onDataChange = () => {},
  onDataSave = () => {},
  hasUnsavedChanges = false,
}) => {
  const [products, setProducts] = useState(initialProducts);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [lastSelectedItemId, setLastSelectedItemId] = useState(null);
  const [mode, setMode] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);

  const selectItem = (id) => {
    if (hasChanges) {
      return;
    }

    setSelectedItemId(id);
    setMode(1);
    setHasChanges(false);
  };

  const editItem = (id) => {
    if (hasChanges) {
      return;
    }

    setSelectedItemId(id);
    setLastSelectedItemId(selectedItemId);
    setMode(2);
    setHasChanges(false);
  };

  const addNewItem = () => {
    if (hasChanges) {
      return;
    }

    setSelectedItemId(null);
    setMode(3);
    setHasChanges(false);
  };

  const deleteItem = (deletedId) => {
    const newProducts = products.filter((product) => product.id !== deletedId);
    setProducts(newProducts);
    setSelectedItemId(null);
    setMode(0);
    setHasChanges(false);
    onDataSave(); // Уведомляем о сохранении данных
  };

  const saveItem = (productData) => {
    if (mode === 2) {
      const updatedProducts = products.map((product) =>
        product.id === selectedItemId ? { ...product, ...productData } : product
      );
      setProducts(updatedProducts);
      setSelectedItemId(
        lastSelectedItemId !== null && lastSelectedItemId !== undefined
          ? lastSelectedItemId
          : selectedItemId
      );
      setLastSelectedItemId(null);
      setMode(1);
      setHasChanges(false);
      onDataSave(); // Уведомляем о сохранении данных
    } else if (mode === 3) {
      const newProduct = {
        id: Math.max(...products.map((p) => p.id)) + 1,
        ...productData,
        imageUrl: "https://via.placeholder.com/150x150?text=New+Product",
      };
      setProducts([...products, newProduct]);
      setSelectedItemId(newProduct.id);
      setLastSelectedItemId(null);
      setMode(1);
      setHasChanges(false);
      onDataSave(); // Уведомляем о сохранении данных
    }
  };

  const cancelEdit = () => {
    setSelectedItemId(
      lastSelectedItemId !== null && lastSelectedItemId !== undefined
        ? lastSelectedItemId
        : selectedItemId
    );
    setLastSelectedItemId(null);
    setMode(
      (lastSelectedItemId !== null && lastSelectedItemId !== undefined) ||
        selectedItemId
        ? 1
        : 0
    );
    setHasChanges(false);
  };

  const onFormChange = () => {
    setHasChanges(true);
    onDataChange(); // Уведомляем родительский компонент об изменениях
  };

  const selectedItem = products.find((item) => item.id === selectedItemId);

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
            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
                isSelected={product.id === selectedItemId && mode === 1}
                mode={mode}
                hasChanges={hasChanges}
                cbSelect={selectItem}
                cbEdit={editItem}
                cbDelete={deleteItem}
              />
            ))}
          </tbody>
        </table>

        <div className="table-actions">
          <button
            onClick={addNewItem}
            disabled={hasChanges}
            className="new-btn"
          >
            New Product
          </button>
        </div>

        {selectedItem && mode === 1 && <CardView product={selectedItem} />}

        {mode === 2 && (
          <CardEdit
            key={selectedItemId}
            product={selectedItem}
            mode={mode}
            cbSave={saveItem}
            cbCancel={cancelEdit}
            onChange={onFormChange}
          />
        )}

        {mode === 3 && (
          <CardEdit
            key="new"
            product={null}
            mode={mode}
            cbSave={saveItem}
            cbCancel={cancelEdit}
            onChange={onFormChange}
          />
        )}
      </div>
    </div>
  );
};

export default ProductTable;
