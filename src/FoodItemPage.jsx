import {useState} from "react";
import axios from "axios";

function FoodItemPage(){
    const [foodItemName, setFoodItemName] = useState('');
    const [calories, setCalories] = useState(0);
    const [nutritionalRation, setNutritionalRation] = useState("");

    const handleCreateMeal = async () => {
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
            <button onClick={handleCreateMeal}>Create Food item</button>
        </div>
    );
}

export default FoodItemPage;