// Card.jsx
import React from 'react';

const Card = ({ imageUrl, title, description, rating }) => {
  // Helper function to render a 5-star rating system
  const renderStars = (currentRating) => {
    const maxStars = 5;
    return (
      <div className="flex text-yellow-500 text-lg">
        {[...Array(maxStars)].map((_, index) => (
          <span key={index}>{index < currentRating ? '★' : '☆'}</span>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Card Image */}
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      
      {/* Card Body */}
      <div className="flex flex-col p-5 flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
          {description}
        </p>
        
        {/* Card Footer (Rating) */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          {renderStars(rating)}
          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {rating} / 5
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;