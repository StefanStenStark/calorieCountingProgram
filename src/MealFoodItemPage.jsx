import axios from "axios";
import { useState } from "react";

function MealFoodItemPage() {
    const [foodItems, setFoodItems] = useState([]);

    const handleGetFoodItemsMeal = async () => {
        try {
            const response = await axios.get("http://localhost:8080/mealFoodItems");
            console.log('foodItems:', response.data);
            setFoodItems(response.data);
        } catch (error) {
            console.error('Error fetching food items:', error.message);
        }
    };

    return (
        <div>
            <button onClick={handleGetFoodItemsMeal}>Get list</button>
            <p>Food Items:</p>
            <ul>
                {foodItems.map((foodItem, index) => (
                    <li key={index}>
                        Food Item ID: {foodItem.foodItemId}, grams: {foodItem.grams}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MealFoodItemPage;
