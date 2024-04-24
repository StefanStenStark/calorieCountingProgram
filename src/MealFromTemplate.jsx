import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MealFromTemplate() {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/allWithFoodItemsTemplates')
            .then(response => {
                setMeals(response.data);
            })
            .catch(error => {
                console.error('Error fetching meals:', error);
            });
    }, []);

    const handleMealClick = (mealId) => {
        localStorage.setItem("selectedMealId", mealId);
    };

    return (
        <div>
            {meals.map(meal => (
                <Link
                    key={meal.id}
                    to="/CreatingMealFromTemplate"
                    onClick={() => handleMealClick(meal.id)}
                >
                    <button>{meal.name}</button>
                </Link>
            ))}
        </div>
    );
}

export default MealFromTemplate;
