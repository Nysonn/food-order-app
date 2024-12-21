import { useEffect, useState } from "react";
import Header from "./components/Header";
import Products from "./components/Products";

function App() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch("http://localhost:3000/meals");
        if (!response.ok) throw new Error("Failed to fetch meals.");
        const data = await response.json();
        const processedData = data.map((meal) => ({
          ...meal,
          price: parseFloat(meal.price),
          image: `http://localhost:3000/${meal.image}`,
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

  const addToCart = (meal) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === meal.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === meal.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...meal, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  if (isLoading) return <p>Loading meals...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Header cartItems={cartItems} onRemoveItem={removeFromCart} />
      <Products meals={meals} addToCart={addToCart} />
    </>
  );
}

export default App;
