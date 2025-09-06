import React, { useState, useEffect, useMemo } from "react";
import "./Reviews.scss";
import productsData from "../productlist.json";

const Reviews = () => {
  // Извлекаем все отзывы из всех товаров
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

  // Мемоизированная фильтрация и сортировка
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews;

    // Фильтрация по рейтингу
    if (filterRating !== "all") {
      filtered = filtered.filter(
        (review) => review.rating === parseInt(filterRating)
      );
    }

    // Сортировка
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

  // Анимация появления элементов при загрузке
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatingItems(new Set());
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Обработка лайков
  const handleLike = (reviewId) => {
    const newLikedReviews = new Set(likedReviews);
    const isLiked = likedReviews.has(reviewId);

    // Обновляем состояние отзывов
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

    // Анимация кнопки лайка
    setAnimatingItems((prev) => new Set([...prev, `like-${reviewId}`]));
    setTimeout(() => {
      setAnimatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(`like-${reviewId}`);
        return newSet;
      });
    }, 300);
  };

  // Обновляем отзывы при изменении данных продуктов
  useEffect(() => {
    setReviews(allReviews);
  }, [allReviews]);

  // Загрузить больше отзывов
  const loadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + 12, filteredAndSortedReviews.length)
    );
  };

  // Рендер звезд рейтинга
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? "filled" : ""}`}>
        ★
      </span>
    ));
  };

  // Format date for English
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
          Total reviews:{" "}
          <span className="count">{filteredAndSortedReviews.length}</span>
        </p>
      </div>

      {/* Панель управления */}
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

      {/* Статистика */}
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

      {/* Сетка отзывов */}
      <div className="reviews-grid">
        {visibleReviews.map((review, index) => (
          <div
            key={review.id}
            className={`review-card ${
              animatingItems.has(review.id) ? "animating" : ""
            }`}
            style={{
              // Ограничиваем delay только для первых 12 элементов для производительности
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
                {review.verified && (
                  <span className="verified">✓ Verified</span>
                )}
              </div>
            </div>

            <div className="review-content">
              <p className="product-name">{review.productName}</p>
              <p className="comment">{review.comment}</p>
            </div>

            <div className="review-footer">
              <button
                className={`like-btn ${
                  likedReviews.has(review.id) ? "liked" : ""
                } ${
                  animatingItems.has(`like-${review.id}`) ? "animating" : ""
                }`}
                onClick={() => handleLike(review.id)}
              >
                <span className="like-icon">👍</span>
                <span className="like-count">{review.helpful}</span>
              </button>
              <span className="helpful-text">Helpful</span>
            </div>
          </div>
        ))}
      </div>

      {/* Кнопка "Загрузить еще" */}
      {visibleCount < filteredAndSortedReviews.length && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={loadMore}>
            Show more ({filteredAndSortedReviews.length - visibleCount} reviews)
          </button>
        </div>
      )}

      {/* Сообщение если ничего не найдено */}
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
