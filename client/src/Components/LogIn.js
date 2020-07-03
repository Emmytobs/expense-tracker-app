import React from 'react'
import Form from './Shared/Form';
import FormInput from './Shared/FormInput';
import FormButton from './Shared/FormButton';

function LogIn(props) {
    return (
        <Form onSubmit={props.loginUser}>
        <div className="">Sign In To Your Account</div>
        <FormInput 
            value={props.loginData.email}
            type={'email'}
            name={'email'}
            labelText={'Email'}
            onChange={props.updateLoginData}
        />

        <FormInput 
            value={props.loginData.password}
            type={'password'}
            name={'password'}
            labelText={'Password'}
            onChange={props.updateLoginData} 
        />
        <FormButton buttonText={'Log In'} />
        <div className="w-full text-center mt-3">
            <span className="inline-block w-1/3 bg-gray-700 py-px"></span>
            <span className="w-1/3">or</span>
            <span className="inline-block w-1/3 bg-gray-700 py-px"></span>
        </div>
        <div className="w-full text-center mt-3">
            <a onClick={() => props.setPage('sign up')} name="log in" className="text-gray-200 hover:text-gray-400 ml-1 underline hover:no-underline cursor-pointer">Create an account</a>
        </div>   
        </Form>
    )
}

export default LogIn