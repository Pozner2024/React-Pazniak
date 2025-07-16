import React from "react";
import "./filter.scss";

class Filter extends React.Component {
  state = {
    words: this.props.words,
    isSorted: false,
    filter: "",
    processedWords: this.props.words,
  };

  sortChanged = (eo) => {
    this.setState({ isSorted: eo.target.checked }, this.processWords);
  };

  filterChanged = (eo) => {
    this.setState({ filter: eo.target.value }, this.processWords);
  };

  reset = () => {
    this.setState({ isSorted: false, filter: "" }, this.processWords);
  };

  processWords = () => {
    let words = this.props.words.slice();
    if (this.state.filter) {
      words = words.filter((word) => word.includes(this.state.filter));
    }
    if (this.state.isSorted) {
      words = words.slice().sort();
    }
    this.setState({ processedWords: words });
  };

  componentDidMount() {
    this.processWords();
  }

  render() {
    return (
      <div className="filter-container">
        <div className="filter-controls">
          <input
            type="text"
            className="filter-input"
            value={this.state.filter}
            onChange={this.filterChanged}
            placeholder="Фильтр..."
          />
          <label>
            <input
              type="checkbox"
              className="filter-checkbox"
              checked={this.state.isSorted}
              onChange={this.sortChanged}
            />
            Сортировать
          </label>
          <button className="filter-reset" onClick={this.reset}>
            Сброс
          </button>
        </div>
        <div className="filter-list">
          {this.state.processedWords &&
            this.state.processedWords.map((word) => (
              <div className="filter-list-item" key={word}>
                {word}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Filter;
