import React from "react";
import "./ReviewsControls.scss";

const ReviewsControls = ({
  sortBy,
  setSortBy,
  filterRating,
  setFilterRating,
  reviews,
}) => {
  return (
    <div className="reviews-wrapper">
      <div className="reviews-controls">
        <div className="filter-group">
          <label>Rating:</label>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="5">5 stars</option>
            <option value="4">4 stars</option>
            <option value="3">3 stars</option>
            <option value="2">2 stars</option>
            <option value="1">1 star</option>
          </select>
        </div>

        <div className="sort-group">
          <label>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="date">By date</option>
            <option value="rating">By rating</option>
            <option value="helpful">By helpfulness</option>
            <option value="name">By name</option>
          </select>
        </div>
      </div>

      <div className="reviews-stats">
        <div className="stat-item">
          <span className="stat-value">
            {(
              reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            ).toFixed(1)}
          </span>
          <span className="stat-label">Average Rating</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">
            {reviews.filter((r) => r.verified).length}
          </span>
          <span className="stat-label">Verified</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">
            {reviews.reduce((sum, r) => sum + r.helpful, 0)}
          </span>
          <span className="stat-label">Total Likes</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewsControls;
