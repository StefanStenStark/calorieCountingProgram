import { useState, useEffect } from "react";
import axios from 'axios';

function MealPage() {
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [typeOfTime, setTypeOfTime] = useState("Day");
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        fetchMeals("day");
    }, []);

    async function fetchMeals(typeOfTime) {
        setTypeOfTime(typeOfTime);
        try {
            const response = await axios.get(`http://localhost:8080/allMealOnThisTime/${typeOfTime}`);
            console.log('meals:', response.data);
            setMeals(response.data);
        } catch (error) {
            console.error('Error fetching meals:', error.message);
        }
    }

    const handleShowFoodItems = (meal) => {
        setSelectedMeal(selectedMeal === meal ? null : meal);
    };
    const calculateCaloriesFor100Grams = (calories, grams) => {
        return (calories * grams) / 100;
    }

    const calculateTotalCalories = (foodItems) => {
        return foodItems.reduce((totalCalories, foodItem) => {
            return totalCalories + calculateCaloriesFor100Grams(foodItem.calories, foodItem.grams);
        }, 0);
    };

    return (
        <div className="app-container ">
            <div>
                <button onClick={() => fetchMeals("day")}>
                    Day
                </button>

                <button onClick={() => fetchMeals("week")}>
                    Week
                </button>

                <button onClick={() => fetchMeals("month")}>
                    Month
                </button>

                <button onClick={() => fetchMeals("year")}>
                    Year
                </button>
            </div>
            <h3>Meals eaten this {typeOfTime}</h3>

            {meals.map((meal, index) => (
                <div key={index}>
                    <button onClick={() => handleShowFoodItems(meal)}>
                        {meal.name} - Total Calories: {calculateTotalCalories(meal.foodItemDTOS)}
                    </button>
                    {selectedMeal === meal && (
                        <table>
                            <thead>
                            <tr>
                                <th>Food Item</th>
                                <th>Calories/100 grams</th>
                                <th>Grams</th>
                                <th>Calories in total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {meal.foodItemDTOS.map((foodItem, foodIndex) => (
                                <tr key={foodIndex}>
                                    <td>{foodItem.name}</td>
                                    <td>{foodItem.calories}</td>
                                    <td>{foodItem.grams}</td>
                                    <td>{calculateCaloriesFor100Grams(foodItem.calories, foodItem.grams)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            ))}
        </div>
    );
}

export default MealPage;
