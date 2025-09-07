import React from "react";
import "./ReviewCard.scss";

const ReviewCard = ({
  review,
  index,
  isLiked,
  isAnimating,
  onLike,
  renderStars,
  formatDate,
}) => {
  return (
    <div
      className={`review-card ${isAnimating ? "animating" : ""}`}
      style={{
        animationDelay: index < 12 ? `${index * 0.05}s` : "0s",
      }}
    >
      <div className="review-header">
        <div className="customer-info">
          <div className="customer-details">
            <h3 className="customer-name">{review.customerName}</h3>
            <div className="rating">{renderStars(review.rating)}</div>
          </div>
        </div>
        <div className="review-meta">
          <span className="date">{formatDate(review.date)}</span>
          {review.verified && <span className="verified">✓ Verified</span>}
        </div>
      </div>

      <div className="review-content">
        <p className="product-name">{review.productName}</p>
        <p className="comment">{review.comment}</p>
      </div>

      <div className="review-footer">
        <button
          className={`like-btn ${isLiked ? "liked" : ""} ${
            isAnimating ? "animating" : ""
          }`}
          onClick={() => onLike(review.id)}
        >
          <span className="like-icon">👍</span>
          <span className="like-count">{review.helpful}</span>
        </button>
        <span className="helpful-text">Helpful</span>
      </div>
    </div>
  );
};

export default ReviewCard;
