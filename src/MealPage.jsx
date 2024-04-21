import { useState } from "react";
import axios from 'axios';

function MealPage() {
    const [mealName, setMealName] = useState('');

    const handleCreateMeal = async () => {
        try {
            const response = await axios.post('http://localhost:8080/createMeal', {
                name: mealName
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
                placeholder="Meal Name"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
            />
            <button onClick={handleCreateMeal}>Create Meal</button>
        </div>
    );
}

export default MealPage;
