import React from 'react'

function ErrorMessage({ errorMessage }) {
    return (
        <div className="bg-red-600 bg-opacity-75 text-center text-white py-2 px-1 my-3 text-sm">
        {errorMessage}
        </div>
    )
}

export default ErrorMessage
