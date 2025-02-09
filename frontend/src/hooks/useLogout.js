import { useAuthContext } from "./useAuthContext";
import { useRecipesContext } from "./useRecipesContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: recipesDispatch } = useRecipesContext();
    const navigate = useNavigate(); // Add navigation

    const logout = () => {
        localStorage.removeItem('user');
        dispatch({type: "LOGOUT"});
        recipesDispatch({type: 'SET_RECIPES', payload: null});
        navigate("/login"); // Redirect to login page
    };

    return { logout };
};
