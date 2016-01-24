import React, {Component} from 'react'
import Relay, {RootContainer, createContainer} from 'react-relay'
import {RelayRouter} from 'react-router-relay'
import {Route, Link, hashHistory} from 'react-router'

import NuanceIndex from './nuanceIndex.jsx'

const petitionIndexQueries = {
  allNuances: () => Relay.QL`query {
      allNuances
  }`
}

const Dashboard = ({children}) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/nuances">nuances</Link>
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
          component={NuanceIndex}
          queries={petitionIndexQueries}
        />
      </Route>
    </RelayRouter>
  )
}