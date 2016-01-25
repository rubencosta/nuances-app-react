import React, { Component } from 'react'
import Relay, { createContainer, Route, Store } from 'react-relay'

import NuanceIndex from './nuanceIndex.jsx'
import NuanceForm from './nuanceForm.jsx'
import LoginForm from './loginForm.jsx'

const Profile = ({currentUser, allWords}) => {
  return currentUser !== null ? (
    <div>
      <button onClick={() => window.localStorage.removeItem('ncsjwt')}>Sign out</button>
      <h1>{currentUser.auth.local.username}</h1>
      <NuanceIndex nuanceConnection={currentUser.nuanceConnection}/>
      <NuanceForm user={currentUser}
                  allWords={allWords}/>
    </div>
  ) : (
    <LoginForm/>
  )
}

export default createContainer(Profile, {
  fragments: {
    currentUser: () => Relay.QL`
        fragment on User{
            ${NuanceForm.getFragment('user')}
            auth{
                local{
                    username
                }
            }
            nuanceConnection(first: 100){
                ${NuanceIndex.getFragment('nuanceConnection')}
            }
        }
    `,
    allWords: () => Relay.QL`
        fragment on AllWords{
            ${NuanceForm.getFragment('allWords')}
        }
    `
  }
})
