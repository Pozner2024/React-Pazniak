import React, { memo } from "react";
import PropTypes from "prop-types";

import "./ClientFilter.css";

const ClientFilter = memo(({ currentFilter, onFilterChange }) => {
  return (
    <div className="filter-buttons">
      <button
        className={currentFilter === "all" ? "active" : ""}
        onClick={() => onFilterChange("all")}
      >
        Все
      </button>
      <button
        className={currentFilter === "active" ? "active" : ""}
        onClick={() => onFilterChange("active")}
      >
        Активные
      </button>
      <button
        className={currentFilter === "blocked" ? "active" : ""}
        onClick={() => onFilterChange("blocked")}
      >
        Заблокированные
      </button>
    </div>
  );
});

ClientFilter.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default ClientFilter;
