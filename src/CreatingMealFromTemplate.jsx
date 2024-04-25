import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "./App.css"

function CreatingMealFromTemplate() {
    const [mealData, setMealData] = useState(null);
    const [updatedMeal, setUpdatedMeal] = useState(null);
    const selectedMealId = localStorage.getItem("selectedMealId");
    const [showFoodItemList, setshowFoodItemList] = useState(false);
    const [foodItems, setFoodItems] = useState([]);

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
    const fetchFoodItems = async () => {
        try {
            const response = await axios.get("http://localhost:8080/getAllFoodItemsTemplate");
            setFoodItems(response.data);
        } catch (error) {
            console.error("Error fetching food items:", error);
        }
    };
    useEffect(() => {
        fetchFoodItems();
    }, []);

    const handleMealNameChange = (e) => {
        setUpdatedMeal({ ...updatedMeal, name: e.target.value });
    };
    const handleInputChange = (index, property, value) => {
        const updatedFoodItems = [...updatedMeal.foodItemDTOS];
        updatedFoodItems[index][property] = value;
        setUpdatedMeal({ ...updatedMeal, foodItemDTOS: updatedFoodItems });
    };
    const toggleListVisibility = () => {
        setshowFoodItemList(!showFoodItemList);
    };

    const handleFoodItemClick = (foodItem) => {
        handleAddFoodItem(foodItem);
        toggleListVisibility();
    };
    const handleAddFoodItem = (foodItem) => {
        setUpdatedMeal({
            ...updatedMeal,
            foodItemDTOS: [
                ...updatedMeal.foodItemDTOS,
                {
                    name: foodItem.name,
                    calories: foodItem.calories,
                    grams: foodItem.grams,
                    nutritionRating: foodItem.nutritionRating
                }
            ]
        });
    };
    const handleRemoveFoodItem = (index) => {
        const updatedFoodItems = [...updatedMeal.foodItemDTOS];
        updatedFoodItems.splice(index, 1);
        setUpdatedMeal({ ...updatedMeal, foodItemDTOS: updatedFoodItems });
    };
    const calculateCaloriesFor100Grams = (calories, grams) => {
        return (calories * grams) / 100;
    };
    const sumTotalCalories = () => {
        return updatedMeal.foodItemDTOS.reduce((totalCalories, foodItem) => {
            return totalCalories + calculateCaloriesFor100Grams(foodItem.calories, foodItem.grams);
        }, 0);
    };
    const saveUpdatedMeal = () => {
        updatedMeal.type = "";
        axios.post('http://localhost:8080/createMealWithFoodItems', updatedMeal)
            .then(response => {
                console.log('Updated meal saved:', response.data);
                // Navigate to the MealPage after saving the meal
                navigate('/mealPage');
            })
            .catch(error => {
                console.error('Error saving updated meal:', error);
            });
    };

    const navigate = useNavigate();

    return (
        <div className="app-container">
            {mealData ? (
                <>
                    <div>

                        <div>
                            <h4>Total Calories: {sumTotalCalories()} </h4>
                        </div>
                        <div>
                            <button onClick={saveUpdatedMeal}>Save Meal</button>
                        </div>

                        <input
                            type="text"
                            value={updatedMeal.name}
                            onChange={handleMealNameChange}
                        />
                    </div>

                        {updatedMeal.foodItemDTOS.map((foodItem, index) => (
                            <li key={index} className="food-item-list">
                            <div style={{border: "1px solid black", padding: "10px"}}>
                                    <div className="input-container">
                                        <label>Name:</label>
                                        <input
                                            type="text"
                                            value={foodItem.name}
                                            onChange={e => handleInputChange(index, 'name', e.target.value)}
                                        />
                                    </div>
                                    <div className="input-container">
                                        <label>Calories/100 gram</label>
                                        <input
                                            type="number"
                                            value={foodItem.calories}
                                            onChange={e => handleInputChange(index, 'calories', e.target.value)}
                                        />
                                    </div>
                                    <div className="input-container">
                                        <label>Grams:</label>
                                        <input
                                            type="number"
                                            value={foodItem.grams}
                                            onChange={e => handleInputChange(index, 'grams', e.target.value)}
                                        />
                                    </div>
                                    <div className="input-container">
                                        <label>Calories: </label>
                                        <span>{calculateCaloriesFor100Grams(foodItem.calories, foodItem.grams)}</span>
                                    </div>
                                    <button onClick={() => handleRemoveFoodItem(index)}>Remove</button>
                                </div>
                            </li>
                        ))}

                    <div>
                        <button onClick={toggleListVisibility}>
                            {showFoodItemList ? "Hide List" : "+"}
                        </button>

                        {showFoodItemList && (
                            <div>
                                <div>
                                    <button onClick={handleAddFoodItem}>Empty Food item</button>
                                </div>
                                <div>
                                    <div>
                                        {foodItems.map((foodItem, index) => (
                                            <div key={index}>
                                            <button  onClick={() => handleFoodItemClick(foodItem)}>
                                                {foodItem.name}
                                            </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <p>Loading meal data...</p>
            )}
        </div>
    );
}

export default CreatingMealFromTemplate;
