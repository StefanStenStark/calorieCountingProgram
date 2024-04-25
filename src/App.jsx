import './App.css'
import {Route, Routes} from 'react-router-dom';
import HomePage from "./HomePage.jsx";
import AboutPage from "./AboutPage.jsx";
import MealPage from "./MealPage.jsx";
import Navbar from "./Navbar.jsx";
import FoodItemTemplatePage from "./FoodItemTemplatePage.jsx";
import StartingPage from "./StartingPage.jsx";
import MealFromTemplate from "./MealFromTemplate.jsx";
import MealFromScratch from "./MealFromScratch.jsx";
import CreatingMealFromTemplate from "./CreatingMealFromTemplate.jsx";

function App() {
    return (
        <>
        <Navbar/>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/about" element={<AboutPage/>} />
            <Route path="/mealPage" element={<MealPage/>} />
            <Route path="/foodItemTemplatePage" element={<FoodItemTemplatePage/>} />
            <Route path="/startingPage" element={<StartingPage/>} />
            <Route path="/mealFromTemplate" element={<MealFromTemplate/>} />
            <Route path="/mealFromScratch" element={<MealFromScratch/>} />
            <Route path="/creatingMealFromTemplate" element={<CreatingMealFromTemplate/>} />
        </Routes>
        </>
    );
}

export default App
