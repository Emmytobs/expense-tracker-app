import React from 'react';

import Header from './Header/HeaderComponent'
import TransactionContainer from './TransactionContainer/TransactionContainerComponent';
import Home from './Home/HomeComponent';
// import {GlobalProvider} from './context/GlobalContext';
import { Route, Switch, Redirect } from 'react-router-dom';
import auth from './auth/auth'
import './App.css';

function App(props) {
  return (
    // <GlobalProvider>
    <>
      <Header />
      <Switch>
        <Route 
          path='/app'
          exact
          render={(props) => {
            if(!auth.isAuthenticated()) {
              return <Redirect to={{ pathname: "/"}} />
            } else {
              return <TransactionContainer {...props} />
            }
          }} 
        />
        <Route 
          path='/' 
          exact 
          component={Home}
        />
      </Switch>
    </>
    // </GlobalProvider>
  );
}

export default App;
