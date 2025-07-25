import React from "react";
import RainbowFrame from "./RainbowFrame";
import "./App.css";

class App extends React.Component {
  render() {
    const rainbowColors = [
      "red",
      "orange",
      "yellow",
      "green",
      "#00BFFF",
      "blue",
      "purple",
    ];

    return (
      <div className="app-container">
        <div className="app-content">
          <RainbowFrame colors={rainbowColors}>Hello!</RainbowFrame>
        </div>
      </div>
    );
  }
}

export default App;
