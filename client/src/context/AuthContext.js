import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [ user, setUser ] = useState(null);
    
    const loginUser = async (loginData) => {
        try {
            
            const response = await axios.post('/user/login', loginData);
            // // Destructure the data object from the response
            // const { data } = response;
            // // Create a user variable to only contain the username and the token
            // const user = { username: data.user.username, token: data.token };
            // // Set the user state
            // setUser(user);

            localStorage.setItem('user', JSON.stringify(user));
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
            // Destructure the data object from the response
            const { data } = response;
            // Create a user variable to only contain the username and the token
            const user = { username: data.username, token: data.token };
            // Set the user state
            setUser(user);

            localStorage.setItem('user', JSON.stringify(user));
            return response;
        } catch(error) {            
            return error.response;
        }      
    } 

    const logoutUser = async () => {
        try {
            const response = await axios.delete("/user/logout", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
            setUser(null);
            localStorage.removeItem('user');
            return response;
        } catch(error) {
            return error.response;
        }
    }

    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem('user'))
    //     if(user) {
    //         setUser(user);
    //     }
    // }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loginUser, logoutUser, signUpUser }}>
            {children}
        </AuthContext.Provider>
    )
}