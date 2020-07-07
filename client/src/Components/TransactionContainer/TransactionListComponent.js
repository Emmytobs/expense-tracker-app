import React from 'react';

function TransactionList({ transaction }) {
    if (transaction.amount > 0) {
        return (
        <div className="w-full py-2 px-5 my-3 relative bg-green-400">
            <span className="absolute h-full w-1 bg-green-900 left-0 top-0"></span>
            <div className="flex flex-row justify-between items-center">
                <p>{transaction.title}:</p>
                {transaction.amount < 0 ? <p>-${Math.abs(transaction.amount)}</p> : <p>${transaction.amount}</p>}
            </div>
        </div> 
        ) 
    } else {
        return (
            <div className="w-full py-2 px-5 my-3 relative bg-red-400">
                <span className="absolute h-full w-1 bg-red-900 left-0 top-0"></span>
                <div className="flex flex-row justify-between items-center">
                    <p>{transaction.title}:</p>
                    {transaction.amount < 0 ? <p>-${Math.abs(transaction.amount)}</p> : <p>${transaction.amount}</p>}
                </div>
            </div>  
        )
    }
}


export default TransactionList;