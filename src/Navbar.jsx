import {Link} from "react-router-dom"
import "./Navbar.css";


export default function Navbar() {
    return (
        <nav className="nav">
            <ul className="nav-links">
                <li>
                    <Link to="/mealPage">History</Link>
                </li>
                <li>
                    <Link to="/mealFromTemplate">New meal</Link>
                </li>
                <li>
                    <Link to="/createTemplatesPage">Template page</Link>
                </li>
            </ul>
        </nav>

    )
}
