import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate(); // Add navigation

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        } else {
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({type: "LOGIN", payload: json});
            setIsLoading(false);
            navigate("/"); // Redirect to home page
        }
    };

    return { signup, isLoading, error };
};
