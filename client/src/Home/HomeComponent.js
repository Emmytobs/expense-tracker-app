import React from 'react';
import auth from '../auth/auth';
import styles from './Home.module.css'
import TabComponent from '../TransactionContainer/TabComponent';
import Cookies from 'universal-cookie';
import axios from 'axios'

function HomeComponent(props) {

    const [ user, setUser ] = React.useState('');
    // const cookies = new Cookies();

    React.useEffect(() => {
        // cookies.set('name', 'Emmytobs', { httpOnly: true });
    }, []);

    const [ loginInfo, setLoginInfo ] = React.useState({
        username: '',
        password: '',
        title: '',
        amount: 0
    })

    const loginUser = async (e) => {
        e.preventDefault();
        // cookies.set('name', 'Emmytobs', { httpOnly: true });
        try {
            // await auth.loginUser(user);
            // props.history.push('/app');
            const { data } = await axios.post('/user/login', loginInfo);
            setUser({ ...data.user, token: data.token });
            localStorage.setItem('token', data.token);
            
            auth.user = data.user;

            props.history.push('/app');
        } catch(error) {
            console.log(error)
        }           
    }

    const logoutUser = async () => {
    }

    const createTransaction = async (e) => {
        e.preventDefault();
        console.log(loginInfo);
        const { title, amount } = loginInfo;
        const body = { title, amount: Number(amount) };
        // Why this error: Unhandled Rejection (TypeError): name.toUpperCase is not a function?
        const transaction = await axios.post('/transaction/add', body, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        console.log(transaction)
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    }

    return (
        <div>
          <div>
            <TabComponent styles={styles.form} />
          </div>
          <form onSubmit={loginUser}>
            <label>Username</label>
            <input onChange={handleChange} name="username" type='text' />
            <br />
            <label>Password</label>
            <input onChange={handleChange} name="password" type='password' />
            <br />
            <button>Login</button>
            <br />
            <button onClick={logoutUser}>Logout</button>
          </form>
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
