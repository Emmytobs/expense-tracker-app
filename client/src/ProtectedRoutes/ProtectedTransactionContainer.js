import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


function ProtectedTransactionContainer({ component: RouteComponent, ...remainingProps }) {
  const savedUser = JSON.parse(localStorage.getItem('user'));

  return (
      <Route 
        {...remainingProps}
        render={(routeProps) => {
          if(savedUser) {
            return <RouteComponent {...routeProps} />
          } else {
            return <Redirect to={"/"} />
          }
        }} 
      />
  )
}

export default ProtectedTransactionContainer
