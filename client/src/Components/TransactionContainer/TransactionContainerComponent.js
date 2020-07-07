import React, { useState, useEffect, useContext } from "react";
import styles from "./TransactionContainer.module.css";
// import { GlobalContext } from '../context/GlobalContext';
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
  // const { addTransaction, transactions } = useContext(GlobalContext);
  const [transactions, setTransactions] = useState([{
    title: "Electricity Bills",
    amount: 20,
    type: 'expense'
  }]);
  const [amountRemaining, setAmountRemaining] = useState(0);
  
  const [ token, setToken ] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // addTransaction({ title, amount: Number(amount) })
  
    function addExpense(transactionForm) {
      const expense = {
        title: transactionForm.title,
        amount: -1 * Number(transactionForm.expense),
        isExpense: true
      }
      const transaction = axios.post('/transaction/add', expense, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(transaction => console.log(transaction))
        .catch(error => console.log(error));
    }
    // addExpense(transactionForm);

    setTransactions((prevtransactions) => {
      let newTransaction;
      if (transactionForm.type === "expense") {
        newTransaction = [
          ...prevtransactions,
          {
            ...transactionForm,
            // Since it is an expense, the amount should be a negative value
            amount: -1 * Number(transactionForm.amount)
          }
        ];
      } else {
        newTransaction = [
          ...prevtransactions,
          {
            ...transactionForm,
            // If it is not an expense, the amount should be a positive value
            amount: Number(transactionForm.amount)
          },
        ];
      }
      return newTransaction;
    });
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
    <>
        {/* <TabComponent isExpense={isExpense} changeTab={changeTab} styles={styles} /> */}
        <AmountLeftComponent amountRemaining={amountRemaining} />
        <div style={{maxHeight: '400px', overflow: 'auto'}}  className="w-3/4 sm:max-w-md lg:max-w-md mx-auto py-4 px-2 bg-white">
          <p>Your recent transactions:</p>
          {transactions.map(transaction => 
            <TransactionList transaction={transaction} transactionsToDisplay={5} />)
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

        
    </>
  );
}

export default TransactionContainer;