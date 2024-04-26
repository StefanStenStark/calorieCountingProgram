import './App.css'
import {Route, Routes} from 'react-router-dom';
import MealPage from "./MealPage.jsx";
import Navbar from "./Navbar.jsx";
import FoodItemTemplatePage from "./FoodItemTemplatePage.jsx";
import MealFromTemplate from "./MealFromTemplate.jsx";
import MealFromScratch from "./MealFromScratch.jsx";
import CreatingMealFromTemplate from "./CreatingMealFromTemplate.jsx";
import CreateMealTemplate from "./CreateMealTemplate.jsx";
import ListOfTemplateMeals from "./ListOfTemplateMeals.jsx";
import CreateTemplatesPage from "./CreateTemplatesPage.jsx";

function App() {
    return (
        <>
        <Navbar/>
        <Routes>
            <Route path="/" element={<MealPage/>} />
            <Route path="/mealPage" element={<MealPage/>} />
            <Route path="/foodItemTemplatePage" element={<FoodItemTemplatePage/>} />
            <Route path="/mealFromTemplate" element={<MealFromTemplate/>} />
            <Route path="/mealFromScratch" element={<MealFromScratch/>} />
            <Route path="/creatingMealFromTemplate" element={<CreatingMealFromTemplate/>} />
            <Route path="/createMealTemplate" element={<CreateMealTemplate/>} />
            <Route path="/listOfTemplateMeals" element={<ListOfTemplateMeals/>} />
            <Route path="/createTemplatesPage" element={<CreateTemplatesPage/>} />
        </Routes>
        </>
    );
}

export default App
