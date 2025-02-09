import { useState } from "react";
import { useRecipesContext } from "../hooks/useRecipesContext";
import { useAuthContext } from "../hooks/useAuthContext";

function RecipeDetails({ recipe }) {
    const { dispatch } = useRecipesContext();
    const { user } = useAuthContext();
    const [isEditing, setIsEditing] = useState(false);
    const [updatedRecipe, setUpdatedRecipe] = useState({
        name: recipe.name,
        ingredients: recipe.ingredients.join(", "), // Convert array to string
        instructions: recipe.instructions,
        prepTime: recipe.prepTime,
        difficulty: recipe.difficulty,
    });

    const handleDelete = async () => {
        if (!user) return;

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes/${recipe._id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${user.token}` },
        });

        if (response.ok) {
            const json = await response.json();
            dispatch({ type: "DELETE_RECIPES", payload: json });
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes/${recipe._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({ ...updatedRecipe, ingredients: updatedRecipe.ingredients.split(", ") }), // Convert back to array
        });

        if (response.ok) {
            const json = await response.json();
            dispatch({ type: "UPDATE_RECIPE", payload: json });
            setIsEditing(false);
        }
    };

    return (
        <div className="recipe-details">
            {isEditing ? (
                <form onSubmit={handleUpdate}>
                    <input type="text" value={updatedRecipe.name} onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, name: e.target.value })} />
                    <input type="text" value={updatedRecipe.ingredients} onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, ingredients: e.target.value })} />
                    <input type="text" value={updatedRecipe.instructions} onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, instructions: e.target.value })} />
                    <input type="number" value={updatedRecipe.prepTime} onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, prepTime: e.target.value })} />
                    <select value={updatedRecipe.difficulty} onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, difficulty: e.target.value })}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    <button type="submit">Update</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            ) : (
                <>
                    <h4>{recipe.name}</h4>
                    <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
                    <p><strong>Instructions:</strong> {recipe.instructions}</p>
                    <p><strong>Prep Time:</strong> {recipe.prepTime}</p>
                    <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                    
                    {/* Updated buttons */}
                    <div className="action-buttons">
                        <span className="material-symbols-outlined delete-btn" onClick={handleDelete}>delete</span>
                        <span className="material-symbols-outlined edit-btn" onClick={() => setIsEditing(true)}>edit</span>
                    </div>
                </>
            )}
        </div>
    );
}

export default RecipeDetails;
