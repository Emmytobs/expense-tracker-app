import React from 'react';
import styles from './Header.module.css';
import auth from "../auth/auth";

function Header() {
    return (
        <header className={styles.header}>
            <div>Expense Tracker App</div>
        </header>
    )
}


export default Header;