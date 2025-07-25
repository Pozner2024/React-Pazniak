import React from "react";
import "./CardView.scss";

class CardView extends React.Component {
  render() {
    const { product } = this.props;

    if (!product) {
      return <div className="CardView">Select a product to view</div>;
    }

    return (
      <div className="CardView">
        <h3>Product Card</h3>
        <div className="card-content">
          <div className="product-image">
            <img src={product.imageUrl} alt={product.name} />
          </div>
          <div className="product-info">
            <p>
              <strong>Name:</strong> {product.name}
            </p>
            <p>
              <strong>Price:</strong> ${product.price.toFixed(2)}
            </p>
            <p>
              <strong>Stock:</strong> {product.stock}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default CardView;
