import React from 'react'

function FormButton(props) {
    return (
    <button className="mt-5 text-gray-700 bg-white hover:bg-gray-400 hover:text-black w-full text-center rounded-lg py-3" style={{...props.style}}>{props.buttonText}</button>
    )
}

export default FormButton
