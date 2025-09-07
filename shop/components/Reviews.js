import React, { useState, useEffect, useMemo } from "react";
import "./Reviews.scss";
import productsData from "../productlist.json";
import ReviewCard from "./ReviewCard";
import ReviewsControls from "./ReviewsControls";

const Reviews = () => {
  const allReviews = useMemo(() => {
    return productsData.flatMap((product) =>
      product.reviews
        ? product.reviews.map((review) => ({
            ...review,
            productName: product.name,
            productId: product.id,
          }))
        : []
    );
  }, []);

  const [reviews, setReviews] = useState(allReviews);
  const [sortBy, setSortBy] = useState("date");
  const [filterRating, setFilterRating] = useState("all");
  const [visibleCount, setVisibleCount] = useState(12);
  const [likedReviews, setLikedReviews] = useState(new Set());
  const [animatingItems, setAnimatingItems] = useState(new Set());

  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews;

    if (filterRating !== "all") {
      filtered = filtered.filter(
        (review) => review.rating === parseInt(filterRating)
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date) - new Date(a.date);
        case "rating":
          return b.rating - a.rating;
        case "helpful":
          return b.helpful - a.helpful;
        case "name":
          return a.customerName.localeCompare(b.customerName);
        default:
          return 0;
      }
    });

    return filtered;
  }, [reviews, sortBy, filterRating]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatingItems(new Set());
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLike = (reviewId) => {
    const newLikedReviews = new Set(likedReviews);
    const isLiked = likedReviews.has(reviewId);

    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              helpful: isLiked ? review.helpful - 1 : review.helpful + 1,
            }
          : review
      )
    );

    if (isLiked) {
      newLikedReviews.delete(reviewId);
    } else {
      newLikedReviews.add(reviewId);
    }
    setLikedReviews(newLikedReviews);

    setAnimatingItems((prev) => new Set([...prev, `like-${reviewId}`]));
    setTimeout(() => {
      setAnimatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(`like-${reviewId}`);
        return newSet;
      });
    }, 300);
  };

  useEffect(() => {
    setReviews(allReviews);
  }, [allReviews]);

  const loadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + 12, filteredAndSortedReviews.length)
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? "filled" : ""}`}>
        ★
      </span>
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const visibleReviews = filteredAndSortedReviews.slice(0, visibleCount);

  return (
    <div className="Reviews">
      <div className="reviews-header">
        <h1>Customer Reviews</h1>
        <p className="reviews-subtitle">
          Total reviews: <span className="count">50</span>
        </p>
      </div>

      <ReviewsControls
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterRating={filterRating}
        setFilterRating={setFilterRating}
        reviews={reviews}
      />

      <div className="reviews-grid">
        {visibleReviews.map((review, index) => (
          <ReviewCard
            key={review.id}
            review={review}
            index={index}
            isLiked={likedReviews.has(review.id)}
            isAnimating={animatingItems.has(`like-${review.id}`)}
            onLike={handleLike}
            renderStars={renderStars}
            formatDate={formatDate}
          />
        ))}
      </div>

      {visibleCount < filteredAndSortedReviews.length && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={loadMore}>
            Show more ({filteredAndSortedReviews.length - visibleCount} reviews)
          </button>
        </div>
      )}

      {filteredAndSortedReviews.length === 0 && (
        <div className="no-results">
          <h3>No reviews found</h3>
          <p>Try changing your filter parameters</p>
        </div>
      )}
    </div>
  );
};

export default Reviews;
