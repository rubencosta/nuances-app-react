import React, {Component} from 'react'
import Relay, {RootContainer, createContainer} from 'react-relay'
import {RelayRouter} from 'react-router-relay'
import {Route, Link, hashHistory} from 'react-router'

import AllNuances from './allNuances.jsx'
import User from './user.jsx'

const petitionIndexQueries = {
  allNuances: () => Relay.QL`query {
      allNuances
  }`
}

const userQueries = {
  user: () => Relay.QL`query {
      user(username: $user)
  }`
}

const Dashboard = ({children}) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/nuances">nuances</Link>
      <Link to="/user/test">test</Link>
      {children}
    </div>
  )
}

const prepareParams = (params, route) => ({
  ...params,
  count: params.count || route.defaultCount
})

export const App = () => {
  return (
    <RelayRouter history={hashHistory}>
      <Route
        path="/"
        component={Dashboard}
      >
        <Route
          path="nuances"
          component={AllNuances}
          queries={petitionIndexQueries}
        />
        <Route
          path="/user/:user"
          component={User}
          queries={userQueries}
        />
      </Route>
    </RelayRouter>
  )
}