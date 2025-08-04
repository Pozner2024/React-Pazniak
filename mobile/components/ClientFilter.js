import React from "react";
import PropTypes from "prop-types";

import "./ClientFilter.css";

class ClientFilter extends React.PureComponent {
  static propTypes = {
    currentFilter: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired,
  };

  render() {
    const { currentFilter, onFilterChange } = this.props;

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
  }
}

export default ClientFilter;
