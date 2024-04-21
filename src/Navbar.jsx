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
                    <Link to="/contact">Contact</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>

    )
}
