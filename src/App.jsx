import './App.css'
import {Route, Routes} from 'react-router-dom';
import HomePage from "./HomePage.jsx";
import AboutPage from "./AboutPage.jsx";
import MealPage from "./MealPage.jsx";
import Navbar from "./Navbar.jsx";
import FoodItemPage from "./FoodItemPage.jsx";

function App() {
    return (
        <>
        <Navbar/>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/about" element={<AboutPage/>} />
            <Route path="/mealPage" element={<MealPage/>} />
            <Route path="/foodItemPage" element={<FoodItemPage/>} />

        </Routes>
        </>
    );
}

export default App
