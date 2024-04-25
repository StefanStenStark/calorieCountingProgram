import {Link} from "react-router-dom"
import "./Navbar.css";


export default function Navbar() {
    return (
        <nav className="nav">
            <div className="site-title">
                <Link to="/">Home</Link>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/mealPage">MealPage</Link>
                </li>
                <li>
                    <Link to="/foodItemTemplatePage">FoodItemTemplatePage</Link>
                </li>
                <li>
                    <Link to="/mealFromTemplate">new meal</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>

    )
}
