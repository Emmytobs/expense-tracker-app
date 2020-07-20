import React from 'react';

function TransactionList({ transaction, handleDeleteTransaction }) {
    if (transaction.amount > 0) {
        return (
        <div className="w-full py-2 px-5 my-3 relative bg-green-400">
            <span className="absolute h-full w-1 bg-green-900 left-0 top-0"></span>
            <div className="flex flex-row justify-between items-center">
                <p>{transaction.title}:</p>
                <div className="">
                    <p className="inline-block">${transaction.amount}</p>
                    <button 
                        className="text-black bg-white text-base text-center inline-block ml-2 px-3 py-1 cursor-pointer hover:text-red-800 font-bold hover:bg-opacity-75 transition-all hover:p-2 rounded-md "
                        onClick={() => handleDeleteTransaction(transaction.id)}>
                            X
                    </button>
                </div>
            </div>
        </div> 
        ) 
    } else {
        return (
            <div className="w-full py-2 px-5 my-3 relative bg-red-400">
                <span className="absolute h-full w-1 bg-red-900 left-0 top-0"></span>
                <div className="flex flex-row justify-between items-center">
                    <p>{transaction.title}:</p>
                    <div className="">
                        <p className="inline-block">-${Math.abs(transaction.amount)}</p>
                        <button 
                            className="text-black bg-white text-base text-center inline-block ml-2 px-3 py-1 cursor-pointer hover:text-red-800 font-bold hover:bg-opacity-75 transition-all hover:p-2 rounded-md "
                            onClick={() => handleDeleteTransaction(transaction.id)}>
                                X
                        </button>
                    </div>
                </div>
            </div>  
        )
    }
}


export default TransactionList;