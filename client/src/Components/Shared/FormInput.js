import React from 'react'

function FormInput(props) {
    return (
        <div className="">
            <label htmlFor="" style={{...props.labelStyle}} className="block mt-3 text-sm">{props.labelText}</label>
            <input onChange={props.onChange} value={props.value} type={props.type} name={props.name} style={{...props.inputStyle}} placeholder={props.placeholder} className="py-1 px-4 text-gray-700 border-b-2 border-gray-400 w-full focus:outline-none focus:border-gray-700 placeholder-gray-700 placeholder-opacity-50" />
        </div>
    )
}

export default FormInput
