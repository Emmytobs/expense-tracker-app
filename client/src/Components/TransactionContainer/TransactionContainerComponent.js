import React, { useState, useEffect, useContext } from "react";
import styles from "./TransactionContainer.module.css";
// import { GlobalContext } from '../context/GlobalContext';
// import axios

import TransactionList from "./TransactionListComponent";
import TabComponent from './TabComponent';
import TransactionFormComponent from './TransactionFormComponent';
import AmountLeftComponent from './AmountLeftComponent';
import axios from "axios";

function TransactionContainer(props) {

  
  const [isExpense, setIsExpense] = useState(true);
  
  const [transactionForm, setTransactionForm] = useState({
    title: '',
    amount: '',
    expense: ''
  })
  // const { addTransaction, transactions } = useContext(GlobalContext);
  const [transactions, setTransactions] = useState([]);
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
    addExpense(transactionForm);

    setTransactions((prevtransactions) => {
      let newTransaction;
      if (isExpense) {
        newTransaction = [
          ...prevtransactions,
          {
            title: transactionForm.title,
            amount: -1 * Number(transactionForm.expense),
            isExpense: true
          }
        ];
      } else if(!isExpense) {
        newTransaction = [
          ...prevtransactions,
          {
            title: transactionForm.title,
            amount: Number(transactionForm.amount),
            isExpense: false
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

    if(expense.length) {
      totalExpense = expense.reduce((prev, current) => prev + current)
    } 
    if(income.length) {
      totalIncome = income.reduce((prev, current) => prev + current)
    }
    calculateAmountRemaining(totalExpense, totalIncome);
  }, [transactions])

  const changeTab = (e) => {
    const { id } = e.target;
    if (id === "expense-tab") {
      setIsExpense(true);
    } else if (id === "amount-tab") {
      setIsExpense(false);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <TabComponent isExpense={isExpense} changeTab={changeTab} styles={styles} />
        <TransactionFormComponent 
          handleChange={handleChange} 
          handleSubmit={handleSubmit} 
          transactionFormStyle={styles.transactionForm} 
          isExpense={isExpense}
          transactionForm={transactionForm}
        />

        <AmountLeftComponent amountRemaining={amountRemaining} />
        <div className={styles.transactionListContainer}>
          {transactions.map((transaction, index) => (
            <TransactionList key={index} transaction={transaction} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TransactionContainer;