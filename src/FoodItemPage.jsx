import {useState} from "react";
import axios from "axios";

function FoodItemPage(){
    const [foodItemName, setFoodItemName] = useState('');
    const [calories, setCalories] = useState(0);
    const [nutritionalRation, setNutritionalRation] = useState("");

    const [foodItems, setFoodItems] = useState([]);
    const [showFoodItems, setShowFoodItems] = useState(false);


    const handleToggleFoodItems = async () => {
        if (!showFoodItems) {
            try {
                const response = await axios.get("http://localhost:8080/getAllFoodItems");
                console.log('foodItems:', response.data);
                setFoodItems(response.data);
                setShowFoodItems(true);
            } catch (error) {
                console.error('Error fetching food items:', error.message);
            }
        } else {
            // Hide food items
            setShowFoodItems(false);
        }
    };

    const handleCreateFoodItem = async () => {
        try {
            const response = await axios.post('http://localhost:8080/createFoodItem', {
                name: foodItemName,
                calories: calories,
                nutritionRating: nutritionalRation
            });
            console.log('Created meal:', response.data);
        } catch (error) {
            console.error('Error creating meal:', error.message);
        }
    };
    return (
        <div>
            <div>
                <label htmlFor="foodItemName">Food item name: </label>
                <input
                    type="text"
                    id="foodItemName"
                    value={foodItemName}
                    onChange={(e) => setFoodItemName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="calories">Calories: </label>
                <input
                    type="number"
                    id="calories"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="nutritionalRation">Nutritional Ratio: </label>
                <input
                    type="text"
                    id="nutritionalRation"
                    value={nutritionalRation}
                    onChange={(e) => setNutritionalRation(e.target.value)}
                />
            </div>
            <button onClick={handleCreateFoodItem}>Create Food item</button>

            <div>
                <button onClick={handleToggleFoodItems}>
                    {showFoodItems ? "Hide Food Items" : "Show Food Items"}
                </button>
                {showFoodItems && (
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Calories</th>
                            <th>Nutritional Rating</th>
                        </tr>
                        </thead>
                        <tbody>
                        {foodItems.map((foodItem, index) => (
                            <tr key={index}>
                                <td>{foodItem.name}</td>
                                <td>{foodItem.calories}</td>
                                <td>{foodItem.nutritionRating}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

        </div>


    );
}

export default FoodItemPage;