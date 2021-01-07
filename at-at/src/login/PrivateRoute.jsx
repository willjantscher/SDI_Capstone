import React from "react";
import { Route, Redirect } from "react-router-dom";
import isAuthed from './utils'

function PrivateRoute ({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthed()
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

export default PrivateRoute;