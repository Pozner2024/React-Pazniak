import React from "react";
import ProductTable from "./ProductTable";
import "./ShopInfo.scss";

class ShopInfo extends React.Component {
  render() {
    return (
      <div className="ShopBanner">
        <h1>{this.props.name}</h1>
        <p className="ShopAddress">{this.props.address}</p>
        <p className="ShopPhone">{this.props.phone}</p>
        <p className="ShopEmail">{this.props.email}</p>
        <p className="ShopWebsite">{this.props.website}</p>
        <ProductTable products={this.props.products} />
      </div>
    );
  }
}

export default ShopInfo;
