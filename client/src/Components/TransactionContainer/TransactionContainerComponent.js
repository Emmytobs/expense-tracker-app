import React, { useState, useEffect, useContext } from "react";
import styles from "./TransactionContainer.module.css";
import { GlobalContext } from '../../context/GlobalContext';
import { AuthContext } from '../../context/AuthContext';
// import axios

import TransactionList from "./TransactionListComponent";
import TransactionFormComponent from './TransactionFormComponent';
import AmountLeftComponent from './AmountLeftComponent';
import axios from "axios";

function TransactionContainer(props) {
  
  const [transactionForm, setTransactionForm] = useState({
    title: '',
    amount: '',
    type: ''
  })
  const { transactions, setTransactions } = useContext(GlobalContext);

  const [amountRemaining, setAmountRemaining] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  
  const [ token, setToken ] = useState('');
  const { user } = React.useContext(AuthContext)
  
  useEffect(() => {
    
    // const token = localStorage.getItem('token');
    // if(token) {
    //   setToken(token)
    //   return;
    // }
    // setToken(user.token);
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    async function addTransaction(transactionForm) {
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
        const transaction = await axios.post('/transaction', newTransaction, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const { title, amount, type } = transaction.data;
        setTransactions(prevTransactions => {
          return [
            ...prevTransactions,
            {
              title,
              amount,
              type
            }
          ]
        })
        setIsLoading(false)
      } 
      catch(error) {
        console.log(error.response.data)
        setIsLoading(false)
      }
    }
    setIsLoading(true)
    addTransaction(transactionForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionForm({
      ...transactionForm,
      [name]: value
    })
  };

  useEffect(() => {
    if(transactions.length === 0) return;

    const income = transactions
      .filter(transaction => transaction.amount > 0)
      .map(transaction => transaction.amount)
    const expense = transactions
      .filter(transaction => transaction.amount < 0)
      .map(transaction => transaction.amount)
    
    let totalExpense;
    let totalIncome;

    function calculateAmountRemaining(totalExpense = 0, totalIncome = 0) {
      // Convert the totalExpense to a positive number
      const amountRemaining = totalIncome - (-1 * totalExpense);
      setAmountRemaining(amountRemaining);
    }

    // If there is an expense, sum up the expenses
    if(expense.length) {
      totalExpense = expense.reduce((prev, current) => prev + current)
    } 
    // If there is an income, sum up the income
    if(income.length) {
      totalIncome = income.reduce((prev, current) => prev + current)
    }
    calculateAmountRemaining(totalExpense, totalIncome);
  }, [transactions])

  return (
    <div className="" styles={{opacity: isLoading && "0.5"}}>
        <AmountLeftComponent amountRemaining={amountRemaining} />
        <div style={{maxHeight: '400px', overflow: 'auto'}}  className="w-3/4 sm:max-w-md lg:max-w-md mx-auto py-4 px-2 bg-white">
          <p>Your recent transactions:</p>
          {transactions.map((transaction, index) => 
            <TransactionList key={index} transaction={transaction} transactionsToDisplay={5}  />)
          }
          <button className="text-center text-gray-900 bg-gray-400">View older transations</button>
        </div>
        <div className="text-center mt-4">
          Create a new transaction
        </div>
        <TransactionFormComponent 
          handleChange={handleChange} 
          handleSubmit={handleSubmit} 
          transactionFormStyle={styles.transactionForm}
          transactionForm={transactionForm}
        />
    </div>
  );
}

export default TransactionContainer;