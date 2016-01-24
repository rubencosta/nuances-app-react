import React, {Component} from 'react'
import Relay, {createContainer, Route, Store} from 'react-relay'

import NuanceIndex from './nuanceIndex.jsx'

const AllNuances = ({allNuances}) => {
  return (
    <div>
      <NuanceIndex nuanceConnection={allNuances.nuanceConnection}/>
    </div>
  )
}

export default createContainer(AllNuances, {
  fragments: {
    allNuances: () => Relay.QL`
        fragment on AllNuances{
            nuanceConnection(first: 100){
                ${NuanceIndex.getFragment('nuanceConnection')}
            }
        }
    `
  }
})
