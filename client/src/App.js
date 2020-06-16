import React, { useContext } from 'react';

import Header from './Header/HeaderComponent'
import TransactionContainer from './TransactionContainer/TransactionContainerComponent';
import ProtectedTransactionContainer from './ProtectedRoutes/ProtectedTransactionContainer';
import Home from './Home/HomeComponent';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { Route, Switch, Redirect } from 'react-router-dom';
import auth from './auth/auth'
import './App.css';

function App(props) {
  
  return (
    // <GlobalProvider>
    <AuthProvider>
      <Header />
      <Switch>
        <ProtectedTransactionContainer 
          path='/app'
          exact
          component={TransactionContainer}
        />
        <Route 
          path='/' 
          exact 
          component={Home}
        />
      </Switch>
    </AuthProvider>
    // </GlobalProvider>
  );
}

export default App;
