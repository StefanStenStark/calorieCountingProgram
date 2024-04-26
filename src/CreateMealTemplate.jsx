import {useState, useEffect} from "react";
import axios from "axios";

function CreateMealTemplate() {
    const mealTemplateData = {
        id: null,
        name: 'name of meal',
        type: 'template',
        creationTime: null,
        foodItemDTOS: []
    };

    const [mealData, setMealData] = useState({...mealTemplateData});
    const [foodItems, setFoodItems] = useState([]);

    useEffect(() => {
        fetchFoodItems();
    }, []);

    const fetchFoodItems = async () => {
        try {
            const response = await axios.get("http://localhost:8080/getAllFoodItemsTemplate");
            setFoodItems(response.data);
        } catch (error) {
            console.error("Error fetching food items:", error);
        }
    };

    const handleInputChange = (index, property, value) => {
        const updatedFoodItems = [...mealData.foodItemDTOS];
        updatedFoodItems[index][property] = value;
        setMealData({
            ...mealData,
            foodItemDTOS: updatedFoodItems
        });
    };

    const calculateCaloriesFor100Grams = (calories, grams) => {
        return (calories * grams) / 100;
    };

    const addFoodItem = (foodItem) => {
        setMealData({
            ...mealData,
            foodItemDTOS: [
                ...mealData.foodItemDTOS,
                {
                    name: foodItem.name,
                    calories: foodItem.calories,
                    grams: foodItem.grams,
                    nutritionRating: foodItem.nutritionRating
                }
            ]
        });
    };
    const createMealWithFoodItems = async () => {
        try {
            const response = await axios.post('http://localhost:8080/createMealWithFoodItems', mealData);
            console.log('New meal created:', response.data);
            // Optionally reset the mealData state if needed
            setMealData({...mealTemplateData});
        } catch (error) {
            console.error('Error creating meal:', error);
        }
    };
    return (
        <div className="app-container">
            <button onClick={createMealWithFoodItems}>Create template</button>
            <div>
                <input
                    type="text"
                    value={mealData.name}
                    onChange={e => setMealData({...mealData, name: e.target.value})}
                />
            </div>

            {mealData.foodItemDTOS.map((foodItem, index) => (
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
                        </div>
                    </li>
                )
            )}
            {

                <div style={{border: "1px solid black", padding: "10px"}}>
                    <p>food item templates</p>
                    {foodItems.map((foodItem, index) => (
                        <button key={index} onClick={() => addFoodItem(foodItem)}>
                            {foodItem.name}
                        </button>
                    ))}
                </div>


            }
        </div>
    )
        ;
}

export default CreateMealTemplate;
