import React from "react";
import "./Controls.scss";

const Controls = ({
  isSorted,
  filter,
  onSortChange,
  onFilterChange,
  onReset,
}) => {
  return (
    <div className="filter-controls">
      <input
        type="text"
        className="filter-input"
        value={filter}
        onChange={onFilterChange}
        placeholder="Фильтр..."
      />
      <label>
        <input
          type="checkbox"
          className="filter-checkbox"
          checked={isSorted}
          onChange={onSortChange}
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