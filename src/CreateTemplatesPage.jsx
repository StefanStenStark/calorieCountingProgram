import {Link} from "react-router-dom";

function CreateTemplatesPage() {



    return (
        <>
            <div className="app-container ">
                <Link to="/createMealTemplate">
                    <button>Create meal template</button>
                </Link>
            </div>
            <div>
                <Link to="/listOfTemplateMeals">
                    <button>Delete meal template</button>
                </Link>
            </div>
            <div>
                <Link to="/foodItemTemplatePage">
                    <button>Manage food item template</button>
                </Link>
            </div>

        </>
    );

}

export default CreateTemplatesPage;