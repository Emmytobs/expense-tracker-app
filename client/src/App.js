import React, { useContext } from 'react';

import Header from './Components/Header'
import TransactionContainer from './Components/TransactionContainer/TransactionContainerComponent';
import ProtectedTransactionContainer from './ProtectedRoutes/ProtectedTransactionContainer';
import Home from './Components/Home';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { GlobalProvider } from './context/GlobalContext';
import { Route, Switch, Redirect } from 'react-router-dom';
import auth from './auth/auth'
import './App.css';

function App(props) {
  
  return (
    <AuthProvider>
      <GlobalProvider>
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
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
