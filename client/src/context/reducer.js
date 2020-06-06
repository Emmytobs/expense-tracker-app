
const reducer = (state, action) => {
    switch(action.type) {
        case "ADD_TRANSACTION":
            addTransaction(state, action.payload);
            break;
        default:
            return state
    }
}

export default reducer

function addTransaction(state, transaction) {
    console.log(state)
    // return {
    //     ...state,
    //     transactions: [
    //         ...state.transactions,
    //         transaction
    //     ]
    // }
}