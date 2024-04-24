import { useState, useEffect } from "react";
import axios from 'axios';

function MealPage() {
    const [selectedMeal, setSelectedMeal] = useState(null);

    const [meals, setMeals] = useState([]);

    useEffect(() => {
        async function fetchMeals() {
            try {
                const response = await axios.get("http://localhost:8080/allWithFoodItems");
                console.log('meals:', response.data);
                setMeals(response.data);
            } catch (error) {
                console.error('Error fetching meals:', error.message);
            }
        }
        fetchMeals();
    }, []);

    const handleShowFoodItems = (meal) => {
        // Toggle selected meal
        setSelectedMeal(selectedMeal === meal ? null : meal);
    };

    const handleDeleteFoodItem = async (meal, foodItem) => {
        console.log(meal.id + "and " + foodItem.id);
        try {
            const response = await axios.delete(`http://localhost:8080/deleteFoodItem/${meal.id}/${foodItem.id}`);
            console.log('Deleted food item:', response.data);
            console.log(meal.id + "and " + foodItem.id);
            // Update meals list after deleting food item
            setMeals(prevMeals => prevMeals.map(prevMeal => {
                if (prevMeal.id === meal.id) {
                    return {
                        ...prevMeal,
                        foodItemDTOS: prevMeal.foodItemDTOS.filter(item => item.id !== foodItem.id)
                    };
                }
                return prevMeal;
            }));
        } catch (error) {
            console.error('Error deleting food item:', error.message);
        }
    };

    const handleUpdateFoodItem = async (meal, foodItem) => {
        const newFoodItem = {
            name: foodItem.name,
            calories: foodItem.calories,
            grams: foodItem.grams,
            nutritionRating: foodItem.nutritionRating
        };
        try {
            const response = await axios.post(`http://localhost:8080/updateFoodItem/${meal.id}`, newFoodItem);
            console.log('Updated food item:', response.data);
            setMeals(prevMeals => prevMeals.map(prevMeal => {
                if (prevMeal.id === meal.id) {
                    return {
                        ...prevMeal,
                        foodItemDTOS: prevMeal.foodItemDTOS.map(item => {
                            if (item.id === foodItem.id) {
                                return response.data;
                            }
                            return item;
                        })
                    };
                }
                return prevMeal;
            }));
        } catch (error) {
            console.error('Error updating food item:', error.message);
        }
    };

    return (
        <div>
            <>
                {meals.map((meal, index) => (
                    <div key={index}>
                        <button onClick={() => handleShowFoodItems(meal)}>
                            {meal.name}
                        </button>
                        {selectedMeal === meal && (
                            <table>
                                <thead>
                                <tr>
                                    <th>Food Item</th>
                                    <th>Calories</th>
                                    <th>Grams</th>
                                    <th>Nutritional Value</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {meal.foodItemDTOS.map((foodItem, foodIndex) => (
                                    <tr key={foodIndex}>
                                        <td>
                                            <button onClick={() => handleUpdateFoodItem(meal, foodItem)}>
                                                {foodItem.name}
                                            </button>
                                        </td>
                                        <td>{foodItem.calories}</td>
                                        <td>{foodItem.grams}</td>
                                        <td>{foodItem.nutritionRating}</td>
                                        <td>
                                            <button onClick={() => handleDeleteFoodItem(meal, foodItem)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                ))}
            </>
        </div>
    );
}

export default MealPage;
