import React from 'react'

function FormInput(props) {
    return (
        <div className="">
            <label for="" style={{...props.labelStyle}} className="block mt-3 mb-1">{props.labelText}</label>
            <input onChange={props.onChange} value={props.value} type={props.type} name={props.name} style={{...props.inputStyle}} className="py-1 px-4 text-gray-700 border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-700 focus:border" />
        </div>
    )
}

export default FormInput
