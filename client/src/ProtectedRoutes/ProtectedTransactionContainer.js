import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


function ProtectedTransactionContainer({ component: RouteComponent, ...remainingProps }) {

  const { setUser, user } = React.useContext(AuthContext);
  const [ isLoading, setIsLoading ] = React.useState(true);
  
  const checkUserRef = React.useRef(1);

  let savedUser;
  React.useEffect(() => {
    // if(checkUserRef.current ==)
    console.log(checkUserRef)
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
              return <RouteComponent {...routeProps} />
          }} 
        />
    )
  }
}

export default ProtectedTransactionContainer
