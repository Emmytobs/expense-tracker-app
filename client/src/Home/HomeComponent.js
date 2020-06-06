import React from 'react';
import auth from '../auth/auth';
import styles from './Home.module.css'
import TabComponent from '../TransactionContainer/TabComponent';
import axios from 'axios'

function HomeComponent(props) {

    const [ books, setBooks ] = React.useState('')
    const [ user, setUser ] = React.useState({
        username: '',
        password: '',
        token: ''
    })

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            // await auth.loginUser(user);
            // props.history.push('/app');
            console.log(user)
            const response = await axios.post('/user/login', user);
            console.log(response)

        } catch(error) {
            console.log(error)
        }
                
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
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
          </form>
            {books && <div>{books[0].title}</div>}
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
