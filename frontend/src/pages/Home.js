import { useEffect } from "react";
import { useRecipesContext } from "../hooks/useWorkoutsContext";
import {useAuthContext} from "../hooks/useAuthContext";
import RecipeDetails from "../components/RecipeDetails";
import RecipeForm from "../components/RecipeForm";

function Home() {
    const {workouts, dispatch} = useRecipesContext();
    const {user} = useAuthContext();

    useEffect(() => {
        const fetchWorkouts = async() => {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/workouts`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
            const json = await response.json();

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        if (user) {
            fetchWorkouts();
        }

    }, [dispatch, user]);

    return(
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <RecipeDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <RecipeForm/>
        </div>
    )
}

export default Home;