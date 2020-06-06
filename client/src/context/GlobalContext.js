import React from 'react';
import { createContext, useReducer } from 'react'
import reducer from './reducer';

const initialState = {
    transactions: [
        {
            title: 'Title',
            amount: 400
        }
    ],
    user: {}
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addTransaction = (transaction) => {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        });
    }

    return (
        <GlobalContext.Provider
            value={{    
                transactions: state.transactions,
                user: state.user,
                addTransaction
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}