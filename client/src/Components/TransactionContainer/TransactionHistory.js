import React from 'react'

import TransactionList from "./TransactionListComponent";
import AmountLeftComponent from './AmountLeftComponent';

function TransactionHistory(props) {
    if(props.hasNoTransactions) {
      return (
        <div className="w-3/4 sm:max-w-md lg:max-w-md mx-auto py-4 px-2 text-center">
          <p className="font-black text-lg">
            You have no transactions. 
          </p>
          <p>Your recent transactions will appear here.</p>
        </div>
      )
    } else {
      return (
        <div>
          <AmountLeftComponent amountRemaining={props.amountRemaining} />
  
          <div
            className="w-3/4 sm:max-w-md lg:max-w-md mx-auto py-4 px-2 mt-5 bg-white"
            style={{maxHeight: '400px', overflow: 'auto'}}>
            <p>Your recent transactions:</p>
  
            {props.transactions.map((transaction, index) => 
              <TransactionList key={index} transaction={transaction} handleDeleteTransaction={props.handleDeleteTransaction} />)
            }
            
            <button 
              className="text-center text-gray-900 bg-gray-400" 
              >
                View older transations
            </button>
          </div>
        </div>
      )
    }
}

export default TransactionHistory
