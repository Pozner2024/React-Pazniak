import React from "react";
import "./List.scss";

const List = ({ words }) => {
  return (
    <div className="filter-list">
      {words &&
        words.map((word) => (
          <div className="filter-list-item" key={word}>
            {word}
          </div>
        ))}
    </div>
  );
};

export default List; 