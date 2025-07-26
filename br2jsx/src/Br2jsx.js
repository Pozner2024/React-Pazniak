import React from "react";
import "./Br2jsx.css";

class BR2JSX extends React.Component {
  render() {
    const lines = this.props.text.split(/<br *\/?>/);
    const res = [];
    for (let i = 0; i < lines.length; i++) {
      if (i) res.push(<br key={`br-${i}`} />);
      res.push(lines[i]);
    }
    return <div>{res}</div>;
  }
}

export default BR2JSX;
