import React from 'react'
import {Route, Redirect} from 'react-router-dom'

export default function AuthRoute({component : Component, ...rest})
{
    return (
        <Route {...rest} render={(props) => (
            localStorage.getItem("nomUtilisateur")
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                }} />
        )} />
    )
}