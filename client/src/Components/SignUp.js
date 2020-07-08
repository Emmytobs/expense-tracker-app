import React from 'react'
import Form from './Shared/Form';
import FormInput from './Shared/FormInput';
import FormButton from './Shared/FormButton';
import ErrorMessage from './Shared/ErrorMessage';

function SignUp(props) {
    return (
        <Form onSubmit={props.signUpUser} onLoading={props.loadingState}>
            {props.error && <ErrorMessage errorMessage={props.error} />}
            <div className="font-black">Create an account</div>
            <FormInput
                value={props.signUpData.email}
                type={'email'}
                name={'email'}
                labelText={'Email'}
                onChange={props.updateSignUpData}
            />
            <FormInput
                value={props.signUpData.username}
                type={'text'}
                name={'username'}
                labelText={'Username'}
                onChange={props.updateSignUpData}
            />
            <FormInput
                value={props.signUpData.password}
                type={'password'}
                name={'password'}
                labelText={'Password'}
                onChange={props.updateSignUpData}
            />
            <FormButton buttonText="Sign Up"/>
            <div className="mt-5">
                <p>Have an account? <a onClick={() => props.setPage('log in')} name="sign up" className="text-gray-700 hover:text-gray-900 ml-1 underline hover:no-underline cursor-pointer">Log in</a></p>
            </div>
        </Form>
    )
}

export default SignUp;
