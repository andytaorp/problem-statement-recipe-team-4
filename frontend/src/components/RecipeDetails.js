import { useRecipesContext } from '../hooks/useRecipesContext';
import { useAuthContext } from '../hooks/useAuthContext';

function RecipeDetails({recipe}) {
    const {dispatch} = useRecipesContext();
    const {user} = useAuthContext();

    const handleClick = async() => {
        if (!user) {
            return;
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes/${recipe._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({type: 'DELETE_RECIPES', payload: json})
        }
    }

    return(
        <div className="recipe-details">
            <h4>{recipe.name}</h4>
            <p><strong>Ingredients:</strong>{recipe.ingredients}</p>
            <p><strong>Instructions:</strong>{recipe.instructions}</p>
            <p><strong>Prep Time:</strong>{recipe.prepTime}</p>
            <p><strong>Difficulty:</strong>{recipe.difficulty}</p>
            <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
        </div>
    )
}

export default RecipeDetails;