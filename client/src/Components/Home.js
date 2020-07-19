import React, { useContext } from 'react';
import auth from '../auth/auth';
import SignUp from './SignUp'
import LogIn from './LogIn'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function HomeComponent(props) {

    const auth = useContext(AuthContext);
    const [loadingState, setLoadingState] = React.useState(false);

    const [ error, setError ] = React.useState('');
    const [ page, setPage ] = React.useState('log in');

    const [ loginData, setLoginData ] = React.useState({
        email: '',
        username: '',
        password: '',
    });

    const [ signUpData, setSignUpData ] = React.useState({
        email: '',
        username: '',
        password: '',
    });

    const loginUser = async (e) => {
        e.preventDefault();
        setLoadingState(true)

        const response = await auth.loginUser(loginData);

        // setLoadingState(false);

        if(response.status === 404) {
            // An object is returned from the server with a property of errorMessage pointing to the appropriate error message
            const { errorMessage } = response.data;
            setError(errorMessage);
        } else {
            // Destructure the data object from the response
            const { data } = response;
            // Create a user variable to only contain the username and the token
            const user = { username: data.user.username, token: data.token };
            // Set the user state
            auth.setUser(user);
            setLoadingState(false);
            // No errors, everything went well. User is successfully logged in
            setError('')
            localStorage.setItem('user', JSON.stringify(user));
            // Take the user to the app
            props.history.push('/app')
        }       
    }

    const signUpUser = async (e) => {
        e.preventDefault();
        setLoadingState(true);

        const response = await auth.signUpUser(signUpData);

        setLoadingState(false);
        console.log(response)
        if(response.status === 201) {
            // No errors, everything went well. A user was successfully created
            setError('')
            props.history.push('/app')
        } else {
            // An object is returned from the server with a property of "errorMessage" pointing to the appropriate error message
            const { errorMessage } = response.data;
            setError(errorMessage);
        }
    }

    const updateLoginData = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    }
    
    const updateSignUpData = (e) => {
        const { name, value } = e.target;
        setSignUpData({ ...signUpData, [name]: value });
    }

    const checkIfSavedUserExists = () => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if(savedUser) {
           window.location = "/app";
           return;  
        // console.log(token)
        }
    }

    checkIfSavedUserExists();

    if(page === 'log in') {
        return (
            <LogIn 
                setPage={setPage} 
                loginUser={loginUser} 
                updateLoginData={updateLoginData} 
                loginData={loginData} 
                error={error} 
                loadingState={loadingState} />
        )
    } else {
        return (
            <SignUp 
                setPage={setPage}
                signUpUser={signUpUser}
                updateSignUpData={updateSignUpData}
                signUpData={signUpData} 
                error={error}
                loadingState={loadingState} />
        )
    }
}

export default HomeComponent
