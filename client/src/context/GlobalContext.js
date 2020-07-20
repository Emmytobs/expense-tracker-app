import React from 'react'
import axios from 'axios'
import { AuthContext } from './AuthContext';

export const GlobalContext = React.createContext();

export function GlobalProvider(props) {
    const { user } = React.useContext(AuthContext)

    const initialState = []

    const [transactions, setTransactions] = React.useState(initialState);

    const deleteTransaction = async (transactionId) => {
        try {
            const response = await axios.delete(`/transaction/${transactionId}`, {
              headers: {
                "Authorization": `Bearer ${user.token}`
              }
            });
            return response;
          } catch(error) {
            return error.response;
          }
    }

    const addTransaction = async (transactionForm) => {
        let newTransaction;
        if (transactionForm.type === "expense") {
          newTransaction = 
            {
              ...transactionForm,
              // Since it is an expense, the amount should be a negative value
              amount: -1 * Number(transactionForm.amount)
            }
        } else {
          newTransaction =
            {
              ...transactionForm,
              // If it is not an expense, the amount should be a positive value
              amount: Number(transactionForm.amount)
            }
        }
        
        try {
          const response = await axios.post('/transaction', newTransaction, {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          })

          return response;
        } 
        catch(error) {
            return error.response;
        }
      }

    return (
        <GlobalContext.Provider 
            value={{
                transactions,
                setTransactions,
                deleteTransaction,
                addTransaction
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    )
}
