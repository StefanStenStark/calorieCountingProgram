import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function DeleteTemplateMeals(){
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        fetchMeals();
    }, []);

    const fetchMeals = async () => {
        try {
            const response = await axios.get('http://localhost:8080/allMealsWithTemplate');
            setMeals(response.data);
        } catch (error) {
            console.error('Error fetching meals:', error);
        }
    };

    const handleDeleteMeal = async (mealId) => {
        try {
            const response = await axios.delete(`http://localhost:8080/deleteMeal/${mealId}`);
            console.log('Meal deleted:', response.data);
            fetchMeals();
        } catch (error) {
            console.error('Error deleting meal:', error);
        }
    };
    return(
        <>
            <div className="app-container ">
                {meals.map(meal => (
                    <Link
                        key={meal.id}
                        onClick={() => handleDeleteMeal(meal.id)}
                    >
                        <div>
                            <button>Delete {meal.name}</button>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default DeleteTemplateMeals;