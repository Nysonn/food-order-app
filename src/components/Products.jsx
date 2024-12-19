import React, { useEffect, useState } from "react";

export default function Products() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch("http://localhost:3000/meals");
        if (!response.ok) {
          throw new Error("Failed to fetch meals.");
        }
        const data = await response.json();

        // Data validation: Ensure proper format
        const processedData = data.map((meal) => ({
          ...meal,
          price: parseFloat(meal.price), // Convert price to a number
          image: `http://localhost:3000/${meal.image}`, // Construct full image URL
        }));

        setMeals(processedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (isLoading) {
    return <p>Loading meals...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
    <h1 className="products-title">Products</h1>
    <ul id="meals">
      {meals.map((meal) => (
        <li key={meal.id} className="meal-item">
          <article>
            <img src={meal.image} alt={meal.name} />
            <h3>{meal.name}</h3>
            <p className="meal-item-description">{meal.description}</p>
            <p className="meal-item-price">${meal.price.toFixed(2)}</p>
          </article>
          <button className="button">Add to Cart</button>
        </li>
      ))}
    </ul>
    </>
  );
}
