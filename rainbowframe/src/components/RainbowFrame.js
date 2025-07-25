import React, { Component } from "react";
import PropTypes from "prop-types";
import "./RainbowFrame.css";

class RainbowFrame extends Component {
  render() {
    const { colors, children } = this.props;

    const rainbowWrapper = colors.reduce((wrappedContent, color, index) => {
      return (
        <div
          key={`${color}-${index}`}
          className={`rainbow-frame frame-${index + 1}`}
          style={{ borderColor: color }}
        >
          {wrappedContent}
        </div>
      );
    }, children);

    return rainbowWrapper;
  }
}

RainbowFrame.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};

export default RainbowFrame;
