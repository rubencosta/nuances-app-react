import React, { Component } from 'react'
import Relay, { createContainer, Store } from 'react-relay'
import CreateNuanceMutation from './mutations/createNuance'

class LoginForm extends Component {
  onSubmit(event) {
    event.preventDefault()
    const {username: {value: username}, password: {value: password}} = event.target.elements
    fetch('http://localhost:8000/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then((response) => response.json())
      .then(({token}) => {
        window.localStorage.setItem('ncsjwt', token)
        this.onSuccess()
      })
  }

  onSuccess() {
    this.reset()
  }

  reset() {
    this.refs.form.reset()
  }

  render() {
    return (
      <section>
        <h1>Sign in</h1>
        <form ref="form" onSubmit={::this.onSubmit}>
          <label htmlFor="username">username:</label>
          <input
            type="text"
            name="username"/>
          <label htmlFor="password">password:</label>
          <input
            type="password"
            name="password"
            required/>
          <button type="submit">Sign in</button>
          <button onClick={::this.reset}>reset</button>
        </form>
      </section>
    )
  }
}

export default createContainer(LoginForm, {
  initialVariables: {
    count: null
  },
  fragments: {
    user: () => Relay.QL`
        fragment on User{
            ${CreateNuanceMutation.getFragment('user')}
        }
    `,
    allWords: () => Relay.QL`
        fragment on AllWords{
            wordConnection(first: 100){
                edges{
                    node{
                        id
                        alias
                        ${CreateNuanceMutation.getFragment('word')}
                    }
                }
            }
        }
    `
  }
})
