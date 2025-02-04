import { useEffect } from "react";
import { useRecipesContext } from "../hooks/useRecipesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import RecipeDetails from "../components/RecipeDetails";
import RecipeForm from "../components/RecipeForm";

function Home() {
    const {recipes, dispatch} = useRecipesContext();
    const {user} = useAuthContext();

    useEffect(() => {
        const fetchRecipes = async() => {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/recipes`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
            const json = await response.json();

            if (response.ok) {
                dispatch({type: 'SET_RECIPES', payload: json})
            }
        }

        if (user) {
            fetchRecipes();
        }

    }, [dispatch, user]);

    return(
        <div className="home">
            <div className="recipes">
                {recipes && recipes.map((recipe) => (
                    <RecipeDetails key={recipe._id} recipe={recipe}/>
                ))}
            </div>
            <RecipeForm/>
        </div>
    )
}

export default Home;