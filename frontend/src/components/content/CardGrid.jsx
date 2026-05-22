// CardGrid.jsx
import React, { useState, useEffect } from 'react';
import Card from './Card';

const CardGrid = ({ apiUrl }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch data from your FastAPI router
    const fetchCards = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [apiUrl]); // Re-run if the API URL changes

  // Conditional rendering for Loading and Error states
  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <p className="text-lg text-gray-500 font-medium animate-pulse">Loading cards...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 w-full text-center">
        <span className="font-medium">Error fetching data:</span> {error}
      </div>
    );
  }

  // Render the Grid once data is successfully fetched
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 w-full max-w-7xl mx-auto">
      {items.map((item) => (
        <Card
          key={item.id}
          // Note: FastAPI commonly returns snake_case JSON by default, 
          // so ensure these match your Pydantic model response
          imageUrl={item.image_url} 
          title={item.title}
          description={item.description}
          rating={item.rating}
        />
      ))}
    </div>
  );
};

export default CardGrid;