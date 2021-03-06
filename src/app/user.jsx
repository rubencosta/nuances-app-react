import React, { Component } from 'react'
import Relay, { createContainer, Route, Store } from 'react-relay'

import NuanceIndex from './nuanceIndex.jsx'
import NuanceForm from './nuanceForm.jsx'

const User = ({user, allWords}) => {
  return (
    <div>
      <h1>{user.auth.local.username}</h1>
      <NuanceIndex nuanceConnection={user.nuanceConnection}/>
      <NuanceForm user={user}
                  allWords={allWords}/>
    </div>
  )
}

export default createContainer(User, {
  fragments: {
    user: () => Relay.QL`
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
