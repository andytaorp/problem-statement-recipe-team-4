import { createContext, useReducer } from "react";

export const RECIPESContext = createContext();

export const RECIPESReducer = (state, action) => {
    switch(action.type) {
        case 'SET_RECIPES':
            return {
                recipes: action.payload
            }
        case 'CREATE_RECIPES':
            return {
                recipes: [action.payload, ...state.recipes]
            }
        case 'DELETE_RECIPES':
            return {
                recipes: state.recipes.filter((recipe) => recipe._id !== action.payload._id)
            }
        default:
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
