import { jwtDecode } from "jwt-decode";
import React, { useReducer, createContext } from "react";

type DecodedToken = {
    userId: number,
    exp: number
}
// initial state with an obj that has a user, who is initially null
const initialState: { user: DecodedToken | null } = {
    user: null
}

// if there is token in local storage -> decode the token 
if(localStorage.getItem('jwtToken')) {
    const decodedToken = jwtDecode<DecodedToken>(localStorage.getItem('jwtToken') as string);

    if(decodedToken.exp as number * 1000 < Date.now()) {
        localStorage.removeItem("token");
    } else {
        initialState.user = decodedToken;
    }
}

// logout function - clears the cache 
const AuthContext = createContext({
    user: null,
    login: (userData: any) => {},
    logout: () => {}
})

function authReducer(state: any, action: any) {
    // looks at the current action we are trying to do to the authorization context
    // look at the type of it 
    switch(action.type) {
        case "LOGIN":
            return {
                // returns current state 
                ...state,
                // change state user to what's in payload
                user: action.payload
            }
        case "LOGOUT":
            return {
                ...state,
                user: null
            }
        default:
            return state; 
    }
}

function AuthProvider(props: any) {
    // dispatcher allows to do thinsg to reducer state 
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (userData: any) => {
        localStorage.setItem("jwtToken", userData.token);
        dispatch({
            type: "LOGIN",
            payload: userData
        })
    }

    const logout = () =>  {
        localStorage.removeItem("jwtToken");
        dispatch({ type: "LOGOUT" })
    }

    return (
        <AuthContext.Provider 
            value={{user: state.user, login, logout}}
            {...props}
        />
    )
}

export { AuthContext, AuthProvider }
