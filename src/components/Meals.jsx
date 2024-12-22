import { useState, useEffect } from 'react';

export default function Meals() {
    const [loadedmeals, setLoadedMeals] = useState([]);

    useEffect(() => {   
        async function fetchMeals() {

            const response =  await fetch('http://localhost:3000/meals');
      
            if (!response.ok) {
              //...
            }
      
            const meals = await response.json();
            setLoadedMeals(meals);
          }

          fetchMeals();
    },[]);

    

    return ( 
    <ul id="meals">
        {loadedmeals.map((meal) => (
        <li key={meal.id}>{meal.name}</li>
        // <li>{meal.price}</li>,
        // <li>{meal.description}</li>,
        // <li>{meal.image}</li>
    ))}
    </ul>
    );
}