import React from 'react'

function TabComponent({styles, isExpense, changeTab}) {
  let tabStyle_amount;
  let tabStyle_expense;

  if(isExpense) {
    tabStyle_amount = null;
    tabStyle_expense = {
      backgroundColor: '#bbb',
      color: '#000'
    }
  }
  else {
    tabStyle_amount = {
      backgroundColor: '#bbb',
      color: '#000',
    };
    tabStyle_expense = null;
  }
  
  return (
      <div className={styles.tabBtnContainer}>
          <button
            id="expense-tab"
            style={tabStyle_expense}
            className={styles.tabBtn}
            onClick={changeTab}
          >
            Add Expense
          </button>
          <button
            id="amount-tab"
            style={tabStyle_amount}
            className={styles.tabBtn}
            onClick={changeTab}
          >
            Add Amount
          </button>
      </div>
  )
}

export default TabComponent
