import React, { useContext } from 'react';
import auth from '../auth/auth';
import styles from './Home.module.css'
import TabComponent from '../TransactionContainer/TabComponent';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function HomeComponent(props) {

    const { user, setUser } = useContext(AuthContext);
    
    const [ error, setError ] = React.useState('');

    const [ loginData, setLoginData ] = React.useState({
        username: '',
        password: '',
    });

    const [ transactionData, setTransactionData ] = React.useState({
        title: '',
        amount: 0
    });

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/user/login', loginData);

            const user = { ...data.user, token: data.token };
            setUser(user);

            localStorage.setItem('user', JSON.stringify(user));
            
            props.history.push('/app');
        } catch(error) {
            const errorMessage = error.toJSON().message;
            console.log(error)
            setError(errorMessage);
        }           
    }

    const logoutUser = async () => {
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

    return (
        <div>
          <div>
            <TabComponent styles={styles.form} />
          </div>
          <form onSubmit={loginUser}>
            <label>Username</label>
            <input onChange={updateLoginData} name="username" type='text' />
            <br />
            <label>Password</label>
            <input onChange={updateLoginData} name="password" type='password' />
            <br />
            <button>Login</button>
            <br />
            <button onClick={logoutUser}>Logout</button>
          </form>
            {error && <div>{error}</div>}
            {/* {
            user.token && 
                <div>
                    Welcome, {user.token}
                    <br></br>
                    Create a transaction
                    <form onSubmit={createTransaction}>
                        <label>Title</label>
                        <input name="title" onChange={handleChange} />
                        <label>Amount</label> <br />
                        <input name="amount" onChange={handleChange} />
                        <button>Add Transaction</button>
                    </form>
                </div>
                
            } */}
        </div>

        // {/* // <div>
        // //     <htmlForm onSubmit={loginUser}>
        // //         <label>Username</label>
        // //         <input onChange={handleChange} name="username" type='text' />
        // //         <br />
        // //         <label>Password</label>
        // //         <input onChange={handleChange} name="password" type='password' />
        // //         <br />
        // //         <button>Login</button>
        // //     </htmlForm>
        // // </div> */}
    )
}

export default HomeComponent
