import React, { useState, useEffect } from "react";
import Controls from "./Controls";
import List from "./List";
import "./Filter.scss";

const Filter = ({ words: initialWords }) => {
  const [words, setWords] = useState(initialWords);
  const [isSorted, setIsSorted] = useState(false);
  const [filter, setFilter] = useState("");
  const [processedWords, setProcessedWords] = useState(initialWords);

  const processWords = () => {
    let result = words.slice();
    if (filter) {
      result = result.filter((word) => word.includes(filter));
    }
    if (isSorted) {
      result = result.slice().sort();
    }
    setProcessedWords(result);
  };

  useEffect(() => {
    processWords();
  }, [isSorted, filter, words]);

  const handleSortChange = (eo) => {
    setIsSorted(eo.target.checked);
  };

  const handleFilterChange = (eo) => {
    setFilter(eo.target.value);
  };

  const handleReset = () => {
    setIsSorted(false);
    setFilter("");
  };

  return (
    <div className="filter-container">
      <Controls
        isSorted={isSorted}
        filter={filter}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />
      <List words={processedWords} />
    </div>
  );
};

export default Filter;
