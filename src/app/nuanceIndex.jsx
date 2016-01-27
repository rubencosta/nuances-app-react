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
              <h1><Link to={`/nuances/${edge.node.id}`}>{edge.node.word.alias}</Link></h1>
              <p>{edge.node.description}</p>
              <p>by: <strong>{edge.node.creator.auth.local.username}</strong></p>
              <img src="{edge.node.image}" width="400" height="400"/>
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
                    creator{
                        auth{
                            local{
                                username
                            }
                        }
                    }
                    word{
                        alias
                    }
                    description
                    image
                }
            }
        }
    `
  }
})
