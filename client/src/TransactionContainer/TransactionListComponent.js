import React from 'react';

import styles from './TransactionList.module.css';

function TransactionList({ transaction }) {
    return (
        <div className={styles.transactionList}>
            <div>
                <p>{transaction.title}:</p>
                {transaction.amount < 0 ? <p>-${Math.abs(transaction.amount)}</p> : <p>${transaction.amount}</p>}
            </div>
        </div>
    )
}


export default TransactionList;