import React from 'react'

export const GlobalContext = React.createContext();

export function GlobalProvider(props) {
    const initialState = []

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
