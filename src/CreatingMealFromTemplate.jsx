import { useEffect, useState } from "react";
import axios from "axios";

function CreatingMealFromTemplate() {
    const [mealData, setMealData] = useState(null);
    const [updatedMeal, setUpdatedMeal] = useState(null);
    const selectedMealId = localStorage.getItem("selectedMealId");

    useEffect(() => {
        if (selectedMealId) {
            axios.get(`http://localhost:8080/mealWithFoodItems/${selectedMealId}`)
                .then(response => {
                    setMealData(response.data);
                    setUpdatedMeal(response.data);
                })
                .catch(error => {
                    console.error('Error fetching meal data:', error);
                });
        }
    }, [selectedMealId]);

    const handleMealNameChange = (e) => {
        setUpdatedMeal({ ...updatedMeal, name: e.target.value });
    };

    const handleInputChange = (index, property, value) => {
        const updatedFoodItems = [...updatedMeal.foodItemDTOS];
        updatedFoodItems[index][property] = value;
        setUpdatedMeal({ ...updatedMeal, foodItemDTOS: updatedFoodItems });
    };

    const handleAddFoodItem = () => {
        setUpdatedMeal({
            ...updatedMeal,
            foodItemDTOS: [
                ...updatedMeal.foodItemDTOS,
                { name: "", calories: 0, grams: 0, nutritionRating: "" }
            ]
        });
    };

    const handleRemoveFoodItem = (index) => {
        const updatedFoodItems = [...updatedMeal.foodItemDTOS];
        updatedFoodItems.splice(index, 1);
        setUpdatedMeal({ ...updatedMeal, foodItemDTOS: updatedFoodItems });
    };

    const saveUpdatedMeal = () => {
        axios.post('http://localhost:8080/createMealWithFoodItems', updatedMeal)
            .then(response => {
                console.log('Updated meal saved:', response.data);
            })
            .catch(error => {
                console.error('Error saving updated meal:', error);
            });
    };

    return (
        <div>
            {mealData ? (
                <>
                    <div>
                        <label>Meal Name:</label>
                        <input
                            type="text"
                            value={updatedMeal.name}
                            onChange={handleMealNameChange}
                        />
                    </div>
                    <h3>Food Items:</h3>
                    <ul>
                        {updatedMeal.foodItemDTOS.map((foodItem, index) => (
                            <li key={index}>
                                <div>
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        value={foodItem.name}
                                        onChange={e => handleInputChange(index, 'name', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label>Calories:</label>
                                    <input
                                        type="number"
                                        value={foodItem.calories}
                                        onChange={e => handleInputChange(index, 'calories', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label>Grams:</label>
                                    <input
                                        type="number"
                                        value={foodItem.grams}
                                        onChange={e => handleInputChange(index, 'grams', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label>Nutrition Rating:</label>
                                    <input
                                        type="text"
                                        value={foodItem.nutritionRating}
                                        onChange={e => handleInputChange(index, 'nutritionRating', e.target.value)}
                                    />
                                </div>
                                <button onClick={() => handleRemoveFoodItem(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleAddFoodItem}>Add Food Item</button>
                    <button onClick={saveUpdatedMeal}>Save Meal</button>
                </>
            ) : (
                <p>Loading meal data...</p>
            )}
        </div>
    );
}

export default CreatingMealFromTemplate;
