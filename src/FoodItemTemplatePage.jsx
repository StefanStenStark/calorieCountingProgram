import { useState, useEffect } from "react";
import axios from "axios";

function FoodItemTemplatePage() {
    const [foodItemName, setFoodItemName] = useState('');
    const [calories, setCalories] = useState(0);
    const [nutritionalRation, setNutritionalRation] = useState("");
    const [grams, setGrams] = useState(0);

    const [foodItems, setFoodItems] = useState([]);

    useEffect(() => {
        fetchFoodItems();
    }, [setFoodItems]);

    async function fetchFoodItems() {
        try {
            const response = await axios.get("http://localhost:8080/getAllFoodItemsTemplate");
            console.log('foodItems:', response.data);
            setFoodItems(response.data);
        } catch (error) {
            console.error('Error fetching food items:', error.message);
        }
    }

    const handleCreateFoodItem = async () => {
        try {
            await axios.post('http://localhost:8080/createFoodItem', {
                name: foodItemName,
                calories: calories,
                nutritionRating: nutritionalRation,
                grams: grams,
                type: "template"
            });
            console.log('Food item created successfully');
            // Reset input fields
            setFoodItemName('');
            setCalories(0);
            setNutritionalRation('');
            setGrams(0);
            // Fetch the updated list of food items after creating a new one
            fetchFoodItems();
        } catch (error) {
            console.error('Error creating food item:', error.message);
        }
    };

    const handleDeleteFoodItem = async (foodItemId) => {
        try {
            await axios.delete(`http://localhost:8080/deleteFoodItem/${foodItemId}`);
            console.log('Food item deleted successfully');
            // Fetch the updated list of food items after deletion
            fetchFoodItems();
        } catch (error) {
            console.error('Error deleting food item:', error.message);
        }
    };

    return (
        <div className="app-container">
            <div className="input-container">
                <label htmlFor="foodItemName">Food item name: </label>
                <input
                    type="text"
                    id="foodItemName"
                    value={foodItemName}
                    onChange={(e) => setFoodItemName(e.target.value)}
                />
            </div>
            <div className="input-container">
                <label htmlFor="calories">Calories: </label>
                <input
                    type="number"
                    id="calories"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                />
            </div>
            <div className="input-container">
                <label htmlFor="grams">Grams: </label>
                <input
                    type="number"
                    id="grams"
                    value={grams}
                    onChange={(e) => setGrams(e.target.value)}
                />
            </div>
            <div className="input-container">
                <label htmlFor="nutritionalRation">Nutritional Ratio: </label>
                <input
                    type="text"
                    id="nutritionalRation"
                    value={nutritionalRation}
                    onChange={(e) => setNutritionalRation(e.target.value)}
                />
            </div>
            <button onClick={handleCreateFoodItem}>Create template</button>

            <div>
                <h3>Food Items:</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Calories</th>
                        <th>Nutritional Rating</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {foodItems.map((foodItem, index) => (
                        <tr key={index}>
                            <td>{foodItem.name}</td>
                            <td>{foodItem.calories}</td>
                            <td>{foodItem.nutritionRating}</td>
                            <td>
                                <button onClick={() => handleDeleteFoodItem(foodItem.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FoodItemTemplatePage;
