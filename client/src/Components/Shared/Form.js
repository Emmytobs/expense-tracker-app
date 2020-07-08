import React from 'react'
import Loader from './Loader';

function Form(props) {
    let loadingStyles = {}
    if(props.onLoading) {
        loadingStyles = {
            opacity: "50%"
        }
    }
    return (
        <form onSubmit={props.onSubmit} style={loadingStyles} className="w-3/4 sm:max-w-md lg:max-w-md mx-auto bg-white p-10 shadow-lg rounded-lg my-5 relative" >
            {props.children}
            {/* Show animated loader when the onLoading prop is true */}
            {props.onLoading && <Loader />}
        </form>
    )
}

export default Form
