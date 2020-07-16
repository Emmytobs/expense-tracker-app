import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


function ProtectedTransactionContainer({ component: RouteComponent, ...remainingProps }) {

  const { setUser, user } = React.useContext(AuthContext);
  const [ isLoading, setIsLoading ] = React.useState(true);
  
  let savedUser;
  React.useEffect(() => {
    savedUser = JSON.parse(localStorage.getItem('user'));
    // If user is saved
    if(savedUser) {
      // Set user
      setUser(savedUser);
      setIsLoading(false);
      return;
    }
    // Else take user back to login page
    window.location = '/'
  }, [])

  if(isLoading) {
    return <div></div>;
  }
  else {
  return (
        <Route 
          {...remainingProps}
          render={(routeProps) => {
            // if(savedUser) {
              return <RouteComponent {...routeProps} />
            // } else {
            //   return <Redirect to={"/"} />
            // }
          }} 
        />
    )
  }
}

export default ProtectedTransactionContainer
