import React from "react";

const Product = ({
  product,
  isSelected,
  hasChanges,
  cbSelect,
  cbEdit,
  cbDelete,
}) => {
  const handleClick = () => {

    if (hasChanges) {
      return;
    }
    cbSelect(product.id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();

    if (hasChanges) {
      return;
    }
    cbEdit(product.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this product?")) {
      cbDelete(product.id);
    }
  };

  const backgroundColor = isSelected ? "yellow" : "white";
  const isDisabled = hasChanges;

  return (
    <tr
      style={{ backgroundColor }}
      onClick={handleClick}
      className={isDisabled ? "disabled" : ""}
    >
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
      <td>
        <button onClick={handleEdit} disabled={isDisabled} className="edit-btn">
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={isDisabled}
          className="delete-btn"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Product;
