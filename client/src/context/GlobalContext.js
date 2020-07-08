import React from 'react'

export const GlobalContext = React.createContext();

export function GlobalProvider(props) {
    const initialState = [{
        title: "Electricity Bills",
        amount: 20,
        type: 'expense'
    }]

    const [transactions, setTransactions] = React.useState(initialState);
    return (
        <GlobalContext.Provider 
            value={{
                transactions,
                setTransactions
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    )
}
