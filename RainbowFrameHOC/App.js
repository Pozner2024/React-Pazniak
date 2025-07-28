import React from "react";
import ReactDOM from "react-dom";
import withRainbowFrame from "./components/RainbowFrameHOC";
import DoubleButton from "./components/DoubleButton";
import "./App.scss";

const App = () => {
  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "#00BFFF",
    "blue",
    "purple",
  ];

  const FramedDoubleButton = withRainbowFrame(colors)(DoubleButton);

  return (
    <div className="app-container">
      <div className="app-content">
        <FramedDoubleButton
          caption1="я из лесу"
          caption2="мороз"
          cbPressed={(num) => alert(num)}
        >
          вышел, был сильный
        </FramedDoubleButton>
      </div>
    </div>
  );
};

const container = document.getElementById("container");
ReactDOM.render(<App />, container);
