import React from "react";
import "./RainbowFrameHOC.scss";

const withRainbowFrame = (colors) => (WrappedComponent) => {
  const RainbowFrameHOC = (props) => {
    const { ...otherProps } = props;

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
    }, <WrappedComponent {...otherProps} />);

    return rainbowWrapper;
  };

  return RainbowFrameHOC;
};

export default withRainbowFrame;
