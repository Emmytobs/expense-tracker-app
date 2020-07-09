import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [ user, setUser ] = useState(null);
    const loginUser = async (loginData) => {
        try {
            
            const response = await axios.post('/user/login', loginData);
            const { data } = response;
            const user = { ...data.user, token: data.token };
            setUser(user);

            localStorage.setItem('token', JSON.stringify(user.token));
            return response;
        } catch(error) {            
            // An object is returned from the server with a property of errorMessage pointing to the appropriate error message
            // const { errorMessage } = error.response.data;
            return error.response
            // return errorMessage;
            // setLoadingState(false)
            // setError(errorMessage);
        }   
    }

    const signUpUser = async (signUpData) => {
        try {
            const response = await axios.post('/user/signup', signUpData);
            const { data } = response
            const user = { ...data.user, token: data.token };
            setUser(user);

            localStorage.setItem('user', JSON.stringify(user));

            return response;
        } catch(error) {            
            return error.response;
        }      
    } 

    const logoutUser = async () => {
    }

    useEffect(() => {
        console.log("This came in from the auth context")
        const token = localStorage.getItem('token')
        // if(token) {
        //     setUser()
        //     if(window.location.pathname === '/') {
        //         window.location = '/app';
        //     }
        // }
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loginUser, logoutUser, signUpUser}}>
            {children}
        </AuthContext.Provider>
    )
}