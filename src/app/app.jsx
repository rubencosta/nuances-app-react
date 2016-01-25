import React, { Component } from 'react'
import Relay, { RootContainer, createContainer } from 'react-relay'
import { RelayRouter } from 'react-router-relay'
import { Route, Link, hashHistory } from 'react-router'

import AllNuances from './allNuances.jsx'
import User from './user.jsx'
import Profile from './profile.jsx'

const petitionIndexQueries = {
  allNuances: () => Relay.QL`query {
      allNuances
  }`
}

const userQueries = {
  user: () => Relay.QL`query {
      user(username: $user)
  }`,
  allWords: () => Relay.QL`query {
      allWords
  }`
}

const profileQueries = {
  currentUser: () => Relay.QL`query {
      currentUser
  }`,
  allWords: () => Relay.QL`query {
      allWords
  }`
}

const Dashboard = ({children}) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        <li>
          <Link to="/nuances">nuances</Link>
        </li>
        <li>
          <Link to="/profile">profile</Link>
        </li>
      </ul>
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
          path="profile"
          component={Profile}
          queries={profileQueries}
        />
        <Route
          path="user/:user"
          component={User}
          queries={userQueries}
        />
      </Route>
    </RelayRouter>
  )
}