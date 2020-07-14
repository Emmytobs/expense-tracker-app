import React from 'react'
import Form from '../Shared/Form'
import FormInput from '../Shared/FormInput'
import FormButton from '../Shared/FormButton';
import ErrorMessage from '../Shared/ErrorMessage'


function TransactionFormComponent(props) {

    return (
        <Form onSubmit={props.handleSubmit}>
          {props.error && <ErrorMessage errorMessage={props.error} />}
          <FormInput 
            name="title"
            type="text"
            onChange={props.handleChange}
            value={props.transactionForm.title}
            placeholder="Transaction title"
            labelText="Enter title"
          />
          <div className="mt-3">
            Transaction type:
          </div>
          <div className="inline-block p-3">
            <input type="radio" name='type' value="expense" onChange={props.handleChange} checked={props.transactionForm.type === 'expense'}/>
            <label className="ml-2">Expense</label>
          </div>
          <div className="inline-block p-3">
            <input type="radio" name='type' value="income" onChange={props.handleChange} checked={props.transactionForm.type === 'income'}/>
            <label className="ml-2">Income</label>
          </div>
          <FormInput 
            name="amount"
            type="number"
            onChange={props.handleChange}
            value={props.transactionForm.amount}
            labelText="Enter Amount"
          />
          <FormButton buttonText="Add transaction" />
        </Form>
    )
}

export default TransactionFormComponent
