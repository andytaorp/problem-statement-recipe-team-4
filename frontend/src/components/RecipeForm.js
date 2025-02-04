import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

function WorkoutForm() {
    const {dispatch} = useWorkoutsContext();
    const {user} =useAuthContext();

    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [preptime, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in!');
            return ;
        }

        const recipe = {name, ingredients, instructions, prepTime, difficulty, imageUrl};

        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/workouts`, 
            {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }

        if (response.ok) {
            setName('');
            setIngredients('');
            setInstructions('');
            setPrepTime('');
            setDifficulty('');
            setImageUrl('');
            setError(null);
            setEmptyFields([]);
            console.log('new recipe added', json);
            dispatch({type: 'CREATE_RECIPES', payload: json})
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Recipe</h3>
            <label>Recipe Name:</label> 
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={title}
                className={emptyFields.includes('name') ? 'error' : ''}
            />
            <label>Ingredients:</label> 
            <input
                type="text"
                onChange={(e) => setIngredients(e.target.value)}
                value={ingredients}
                className={emptyFields.includes('ingredients') ? 'error' : ''}
            />
            <label>Instructions:</label> 
            <input
                type="text"
                onChange={(e) => setInstructions(e.target.value)}
                value={instructions}
                className={emptyFields.includes('instructions') ? 'error' : ''}
            />
            <label>Difficulty:</label> 
            <input type="radio" id="difficulty1" name="difficulty" value="easy"/>
            <label for="difficulty1">Easy</label><br/>
             <input type="radio" id="difficulty2" name="difficulty" value="medium"/>
            <label for="difficulty2">Medium</label><br/>
            <input type="radio" id="difficulty3" name="difficulty" value="hard"/>
            <label for="difficulty3">Hard</label><br/>

            <button>Add Recipe</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm;