import React from 'react'

function TransactionFormComponent(props) {

    return (
        <form onSubmit={props.handleSubmit} id='transactionForm' className={props.transactionFormStyle}>
          <div>
            <label>Title</label>
            <input
              onChange={props.handleChange}
              name="title"
              value={props.transactionForm.title}
              type="text"
            />
          </div>
          <div>
            {props.isExpense ? (
              <>
                <label>Expense</label>
                <input
                    onChange={props.handleChange}
                    name="expense"
                    value={props.transactionForm.expense}
                    type="number"
                />
              </>
            ) : (
              <>
                <label>Amount</label>
                <input
                    onChange={props.handleChange}
                    name="amount"
                    value={props.transactionForm.amount}
                    type="number"
                />
              </>
            )}
            <button>Add</button>
          </div>
        </form>
    )
}

export default TransactionFormComponent
