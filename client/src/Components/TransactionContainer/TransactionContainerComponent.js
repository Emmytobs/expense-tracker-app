import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from '../../context/GlobalContext';
import { AuthContext } from '../../context/AuthContext';

import TransactionFormComponent from './TransactionFormComponent';
import TransactionHistory from './TransactionHistory';
import axios from "axios";

function TransactionContainer(props) {
  
  const [transactionForm, setTransactionForm] = useState({
    title: '',
    amount: '',
    type: ''
  })
  const { transactions, setTransactions, deleteTransaction, addTransaction } = useContext(GlobalContext);

  const [amountRemaining, setAmountRemaining] = useState(0);
  const [onLoading, setOnLoading] = useState(false)
    
  
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingTransactions, setIsFetchingTransactions] = useState(true);
  const [hasNoTransactions, setHasNoTransactions] = useState(false)

  const [error, setError] = useState('')

  const { user } = React.useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOnLoading(true);
    const { title, amount, type } = transactionForm;
    // If an error exists, set an error message
    if(!title || !amount || !type ) {
      setOnLoading(false);
      return setError('All fields required')
    }
    // If the error no longer exists, remove it
    setError('');
    const handleAddTransaction = async (transactionForm) => {
      const response = await addTransaction(transactionForm);

      setOnLoading(false);
      
      if(response.status !== 201) {
        setError("Couldn't add transaction. Check your internet connection")
        console.log(error.response.data)
        return;
      }
      
      const { _id: id, title, amount, type } = response.data;
      setTransactions(prevTransactions => {
        // Set the most recent transactions to appear at the top
        return [
          {
            id,
            title,
            amount,
            type
          },
          ...prevTransactions
        ]
      })
      // Empty the transaction form when a transaction has been successfully created
      setTransactionForm({ title: '', amount: '', type: '' })
    }
    handleAddTransaction(transactionForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionForm({
      ...transactionForm,
      [name]: value
    })
  };
  
  const handleDeleteTransaction = async (transactionId) => {
    const response = await deleteTransaction(transactionId);

    if(response.status !== 200) {
      return console.log(error.response.data);
    } 
    const remainingTransactions = transactions.filter(transaction => transaction.id !== transactionId);
    setTransactions(remainingTransactions);
  }

  // Everytime the transaction changes, this is run to calculate the amount remaining
  useEffect(() => {
    // If there are no transactions, do nothing
    if(transactions.length === 0) {
      setAmountRemaining(0);
      setHasNoTransactions(true);
      return;
    }
    setHasNoTransactions(false);

    // This contains an array where the amount is > 0
    // We filter it to return an array where amount > 0
    // We then map it to give back an array of the individual amount only
    const income = transactions
      .filter(transaction => transaction.amount > 0)
      .map(transaction => transaction.amount)

    // The same is done here
    const expense = transactions
      .filter(transaction => transaction.amount < 0)
      .map(transaction => transaction.amount)
    
    // Declare the variables to hold the sums of the income and expenses each
    let totalExpense;
    let totalIncome;


    function calculateAmountRemaining(totalExpense = 0, totalIncome = 0) {
      // The totalExpense or totalIncome could be null

      // Convert the totalExpense to a positive number
      // Subtract the total expenses from the total income
      const amountRemaining = totalIncome - (-1 * totalExpense);
      // Update the state to reflect the amount remaining
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


  // Everytime the component mounts, this is run to fetch recent transactions
  useEffect(()=> {
    const fetchRecentTransactions = async () => {
      try {
        // Fetch five of the recently created transactions
        const response = await axios.get("/transactions?limit=5&skip=0&sortBy=createdAt_-1", {
          headers: {
            "Authorization": `Bearer ${user.token}`
          }
        })

        // Get the response and map each to an array with only the title, amount, and type properties of each transaction
        const recentTransactions = response.data.map(transaction => {
          return {
            id: transaction._id,
            title: transaction.title,
            amount: transaction.amount,
            type: transaction.type
          } 
        })

        if(recentTransactions.length == 0) {
          setHasNoTransactions(true);
        }
      
        // Update the transactions in the state
        // Since the transactions in the global context is an array, break it up into 
        setTransactions([...transactions, ...recentTransactions]);
        setIsFetchingTransactions(false)
      } catch(error) {
        console.log(error.response.data)
        setIsFetchingTransactions(false);
      }
    }
    fetchRecentTransactions()
  }, []);
  
  if(isFetchingTransactions) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="" styles={{opacity: isLoading && "0.5"}}>
      <TransactionHistory amountRemaining={amountRemaining} transactions={transactions} handleDeleteTransaction={handleDeleteTransaction} hasNoTransactions={hasNoTransactions} />

      <div className="text-center mt-4">
        Create a new transaction
      </div>

      <TransactionFormComponent 
        handleChange={handleChange} 
        handleSubmit={handleSubmit} 
        transactionForm={transactionForm}
        error={error}
        onLoading={onLoading}
      />
    </div>
  );
}

export default TransactionContainer;