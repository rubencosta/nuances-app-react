import React, {Component} from 'react'
import Relay, {createContainer, Route, Store} from 'react-relay'

import NuanceIndex from './nuanceIndex.jsx'

const User = ({user}) => {
  return (
    <div>
      <h1>{user.auth.local.username}</h1>
      <NuanceIndex nuanceConnection={user.nuanceConnection}/>
    </div>
  )
}

export default createContainer(User, {
  fragments: {
    user: () => Relay.QL`
        fragment on User{
            auth{
                local{
                    username
                }
            }
            nuanceConnection(first: 100){
                ${NuanceIndex.getFragment('nuanceConnection')}
            }
        }
    `
  }
})
