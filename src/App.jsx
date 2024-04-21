import './App.css'
import {Route, Routes} from 'react-router-dom';
import HomePage from "./HomePage.jsx";
import AboutPage from "./AboutPage.jsx";
import ContactPage from "./ContactPage.jsx";
import Navbar from "./Navbar.jsx";

function App() {
    return (
        <>
        <Navbar/>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/about" element={<AboutPage/>} />
            <Route path="/contact" element={<ContactPage/>} />
        </Routes>
        </>
    );
}

export default App
