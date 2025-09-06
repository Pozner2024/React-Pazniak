import React, { useState } from "react";
import "./Tooltip.scss";

const Tooltip = ({ children, text, position = "top", delay = 300 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const showTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && (
        <div className={`tooltip tooltip--${position}`} role="tooltip">
          <div className="tooltip__content">
            {text}
          </div>
          <div className="tooltip__arrow"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
