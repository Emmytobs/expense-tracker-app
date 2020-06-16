import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


function ProtectedTransactionContainer({ component: RouteComponent, ...remainingProps }) {
  const { user } = React.useContext(AuthContext);

  return (
      <Route 
        {...remainingProps}
        render={(routeProps) => {
          if(!!user) {
            return <RouteComponent {...routeProps} />
          } else {
            return <Redirect to={"/"} />
          }
        }} 
      />
  )
}

export default ProtectedTransactionContainer
