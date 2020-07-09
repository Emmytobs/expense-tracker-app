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

        setLoadingState(false);

        if(response.status === 404) {
            // An object is returned from the server with a property of errorMessage pointing to the appropriate error message
            const { errorMessage } = response.data;
            setError(errorMessage);
        } else {
            // No errors, everything went well. User is successfully logged in
            setError('')
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

        // try {
        //     const { data } = await axios.post('/user/signup', signUpData);

        //     const user = { ...data.user, token: data.token };
        //     auth.setUser(user);
        //     setLoadingState(false);

        //     localStorage.setItem('user', JSON.stringify(user));
        //     props.history.push('/app');
        // } catch(error) {            
        //     const { errorMessage } = error.response.data;
        //     setLoadingState(false)
        //     setError(errorMessage);
        // }      
    }

    // const createTransaction = async (e) => {
    //     e.preventDefault();
    //     console.log(loginInfo);
    //     const { title, amount } = loginInfo;
    //     const body = { title, amount: Number(amount) };
    //     // Why this error: Unhandled Rejection (TypeError): name.toUpperCase is not a function?
    //     const transaction = await axios.post('/transaction/add', body, {
    //         headers: {
    //             'Authorization': `Bearer ${user.token}`
    //         }
    //     });
    //     console.log(transaction)
    // }

    const updateLoginData = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    }
    
    const updateSignUpData = (e) => {
        const { name, value } = e.target;
        setSignUpData({ ...signUpData, [name]: value });
    }

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
