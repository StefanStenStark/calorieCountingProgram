import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MealFromTemplate() {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/allMealsWithTemplate')
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
        <>
            <div className="app-container ">
                {meals.length === 0 ? (
                    <>
                        <p>No meals found, please create one</p>
                        <Link to="/createMealTemplate">
                            <button>Create meal template</button>
                        </Link>
                    </>
                ) : (
                    meals.map(meal => (
                        <Link
                            key={meal.id}
                            to="/creatingMealFromTemplate"
                            onClick={() => handleMealClick(meal.id)}
                        >
                            <div>
                                <button>{meal.name}</button>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </>
    );
}

export default MealFromTemplate;
