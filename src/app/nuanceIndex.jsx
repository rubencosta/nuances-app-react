import React, { Component } from 'react'
import Relay, { createContainer, Route, Store } from 'react-relay'
import { Link } from 'react-router'

const NuanceIndex = ({nuanceConnection}) => {
  return (
    <section>
      <ul>
        {nuanceConnection.edges.map((edge) => (
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
    nuanceConnection: () => Relay.QL`
        fragment on NuanceConnection{
            edges{
                node {
                    id
                    word
                    description
                }
            }
        }
    `
  }
})
