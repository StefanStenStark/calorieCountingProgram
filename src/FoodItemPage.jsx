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
            <input
                type="text"
                placeholder="Food item name"
                value={foodItemName}
                onChange={(e) => setFoodItemName(e.target.value)}
            />
            <input
                type="number"
                placeholder="calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
            />
            <input
                type="text"
                placeholder="NutritionalRation"
                value={nutritionalRation}
                onChange={(e) => setNutritionalRation(e.target.value)}
            />
            <button onClick={handleCreateMeal}>Create Food item</button>
        </div>
    );
}

export default FoodItemPage;