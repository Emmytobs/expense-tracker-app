import React from 'react'

function Loader() {
    return (
        <div className="absolute bg-transparent w-full h-full inset-0 flex items-center justify-center">
            <p className="h-6 bg-transparent text-center font-bold text-lg text-black w-1/3 relative">Loading...</p>
        </div>
    )
}

export default Loader;
