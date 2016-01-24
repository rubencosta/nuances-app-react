import React, {Component} from 'react'
import Relay, {createContainer, Route, Store} from 'react-relay'
import {Link} from 'react-router'

const NuanceIndex = ({allNuances}) => {
  return (
    <section>
      <ul>
        {allNuances.nuanceConnection.edges.map((edge) => (
          <li key={edge.node.id}>
            <article>
              <Link to={`/nuances/${edge.node.id}`}>
                {edge.node.id}
                <h1>{edge.node.word}</h1>
                <p>{edge.node.description}</p>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default createContainer(NuanceIndex, {
  fragments: {
    allNuances: () => Relay.QL`
        fragment on AllNuances{
            nuanceConnection(first: 100){
                edges{
                    node {
                        id
                        word
                        description
                    }
                }
            }
        }
    `
  }
})
