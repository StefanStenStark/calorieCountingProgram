import {Link} from "react-router-dom";

function StartingPage() {


    return (
        <>
            <div>
                <Link to="/mealFromTemplate">
                    <button>From template</button>
                </Link>
                <Link to="/mealFromScratch">
                    <button>From scratch</button>
                </Link>
            </div>
        </>
    );
}

export default StartingPage;
