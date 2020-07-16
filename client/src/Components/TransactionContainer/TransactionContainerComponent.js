import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from '../../context/GlobalContext';
import { AuthContext } from '../../context/AuthContext';

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
  const [isFetchingTransactions, setIsFetchingTransactions] = useState(true);

  const [error, setError] = useState('')

  const { user } = React.useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, amount, type } = transactionForm;
    // If an error exists, set an error message
    if(!title || !amount || !type ) {
      return setError('All fields required')
    }
    // If the error no longer exists, remove it
    setError('');
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
          // Set the most recent transactions to appear at the top
          return [
            {
              title,
              amount,
              type
            },
            ...prevTransactions
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

  // Everytime the transaction changes, this is run to calculate the amount remaining
  useEffect(() => {
    // If there are no transactions, do nothing
    if(transactions.length === 0) return;

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
            title: transaction.title,
            amount: transaction.amount,
            type: transaction.type
          } 
        })

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
        <AmountLeftComponent amountRemaining={amountRemaining} />

        <div 
          style={{maxHeight: '400px', overflow: 'auto'}}  
          className="w-3/4 sm:max-w-md lg:max-w-md mx-auto py-4 px-2 bg-white">
          <p>Your recent transactions:</p>

          {transactions.map((transaction, index) => 
            <TransactionList key={index} transaction={transaction} transactionsToDisplay={5}  />)
          }
          
          <button 
            className="text-center text-gray-900 bg-gray-400" 
            onClick={() => props.history.goBack()}>
              View older transations
          </button>
        </div>

        <div className="text-center mt-4">
          Create a new transaction
        </div>

        <TransactionFormComponent 
          handleChange={handleChange} 
          handleSubmit={handleSubmit} 
          transactionForm={transactionForm}
          error={error}
        />
    </div>
  );
}

export default TransactionContainer;