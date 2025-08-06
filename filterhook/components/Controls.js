import React from "react";
import "./Controls.scss";

const Controls = ({
  isSorted,
  filter,
  onSortChange,
  onFilterChange,
  onReset,
}) => {
  const handleInputChange = (event) => {
    const filterText = event.target.value;
    onFilterChange(filterText);
  };

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    onSortChange(isChecked);
  };

  return (
    <div className="filter-controls">
      <input
        type="text"
        className="filter-input"
        value={filter}
        onChange={handleInputChange}
        placeholder="Фильтр..."
      />
      <label>
        <input
          type="checkbox"
          className="filter-checkbox"
          checked={isSorted}
          onChange={handleCheckboxChange}
        />
        Сортировать
      </label>
      <button className="filter-reset" onClick={onReset}>
        Сброс
      </button>
    </div>
  );
};

export default Controls; 