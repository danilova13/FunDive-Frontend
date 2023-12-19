import { jwtDecode } from "jwt-decode";
import React, { useReducer, createContext } from "react";

type DecodedToken = {
    userId: number,
    exp: number
}

type UserData = {
    auth: {
        jwtToken: string;
    },
    email: string,
    password: string
}
// initial state with an obj that has a user, who is initially null
const initialState: { user: DecodedToken | null } = {
    user: null
}

function clearSession(item: string) {
    return localStorage.removeItem(item);
}

// if there is token in local storage -> decode the token 
if(localStorage.getItem('jwtToken')) {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
        const decodedToken = jwtDecode<DecodedToken>(storedToken as string);
        console.log(decodedToken);
    
        if(decodedToken.exp as number * 1000 < Date.now()) {
            clearSession('jwtToken');
        } else {
            initialState.user = decodedToken;
        }
    } else {
        console.error('Invalid JWT token');
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
    // dispatcher allows to do things to reducer state 
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (userData: UserData) => {
        localStorage.setItem("jwtToken", userData.auth.jwtToken);
        dispatch({
            type: "LOGIN",
            payload: userData
        })
    }

    const logout = () =>  {
        clearSession('jwtToken');
        dispatch({ type: "LOGOUT" })
    }

    return (
        <AuthContext.Provider 
            value={{ ...state, login, logout}}
            {...props}
        />
    )
}

export { AuthContext, AuthProvider, clearSession }
