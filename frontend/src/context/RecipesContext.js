import { createContext, useReducer } from "react";

<<<<<<< HEAD
export const RecipesContext = createContext();

export const recipesReducer = (state, action) => {
=======
export const RECIPESContext = createContext();

export const RECIPESReducer = (state, action) => {
>>>>>>> a35c6a3af93f4e8db32d5199525fc92f94bff912
    switch(action.type) {
        case 'SET_RECIPES':
            return {
                recipes: action.payload
            }
<<<<<<< HEAD
        case 'CREATE_RECIPE':
            return {
                recipes: [action.payload, ...state.recipes]
            }
        case 'DELETE_RECIPE':
=======
        case 'CREATE_RECIPES':
            return {
                recipes: [action.payload, ...state.recipes]
            }
        case 'DELETE_RECIPES':
>>>>>>> a35c6a3af93f4e8db32d5199525fc92f94bff912
            return {
                recipes: state.recipes.filter((recipe) => recipe._id !== action.payload._id)
            }
        default:
<<<<<<< HEAD
            return state;
    }
}

export function RecipesContextProvider({ children }) {
    const [state, dispatch] = useReducer(recipesReducer, {
        recipes: null
    });

    return (
        <RecipesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </RecipesContext.Provider>
    );
}
=======
            return state
    }
}

export function RECIPESContextProvider({children}) {
    const [state, dispatch] = useReducer(RECIPESReducer, {
        recipes: null
    });

    return(
        <RECIPESContext.Provider value={{...state, dispatch}}>
            {children}
        </RECIPESContext.Provider>
    )
}
>>>>>>> a35c6a3af93f4e8db32d5199525fc92f94bff912
