export default function Products({ meals, addToCart }) {
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
            <button className="button" onClick={() => addToCart(meal)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
