import React from "react";

import "./Shop.scss";

class ShopInfo extends React.Component {
  render() {
    return (
      <div className="ShopBanner">
        <p className="ShopName">
          <strong>{this.props.name}</strong>
        </p>
        <p className="ShopAddress">{this.props.address}</p>
        <p className="ShopPhone">{this.props.phone}</p>
        <p className="ShopEmail">{this.props.email}</p>
        <p className="ShopWebsite">{this.props.website}</p>
      </div>
    );
  }
}

export default ShopInfo;
