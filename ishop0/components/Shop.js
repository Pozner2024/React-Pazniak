import React from "react";

import "./Shop.css";

class ShopInfo extends React.Component {
  render() {
    return (
      <div className="Shop_Banner">
        <p className="Shop_Name">
          <strong>{this.props.name}</strong>
        </p>
        <p className="Shop_Address">{this.props.address}</p>
        <p className="Shop_Phone">{this.props.phone}</p>
        <p className="Shop_Email">{this.props.email}</p>
        <p className="Shop_Website">{this.props.website}</p>
      </div>
    );
  }
}

export default ShopInfo;
