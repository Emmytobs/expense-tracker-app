import React from 'react'

function Form(props) {
    return (
        <form onSubmit={props.onSubmit} style={{...props.style}} className="w-3/4 sm:max-w-md lg:max-w-md mx-auto bg-gray-600 p-10 shadow-lg rounded-lg my-5" >
            {props.children}
        </form>
    )
}

export default Form
