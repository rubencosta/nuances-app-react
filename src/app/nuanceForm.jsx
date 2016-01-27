import React, { Component } from 'react'
import Relay, { createContainer, Store } from 'react-relay'
import CreateNuanceMutation from './mutations/createNuance'

class NuanceForm extends Component {
  onSubmit(event) {
    event.preventDefault()
    const {word: {value: wordId}, description: {value: description}, image: {files: [image, ...rest]}} = event.target.elements
    Store.applyUpdate(new CreateNuanceMutation({
      user: this.props.user,
      word: this.props.allWords.wordConnection.edges.filter((edge) => edge.node.id === wordId).map((edge) => edge.node).shift(),
      description,
      image,
    }), {onFailure: ::this.onFailure, onSuccess: ::this.onSuccess}).commit()
  }

  onSuccess() {
    this.reset()
  }

  onFailure(transaction) {
    const error = transaction.getError() || new Error('Mutation failed.')
    console.error(error)
  }

  reset() {
    this.refs.form.reset()
  }

  render() {
    const {allWords} = this.props
    return (
      <section>
        <form ref="form" onSubmit={::this.onSubmit}>
          <select name="word">
            {allWords.wordConnection.edges.map((edge) => {
              return (
                <option key={edge.node.id}
                        value={edge.node.id}>
                  {edge.node.alias}
                </option>
              )
            })}
          </select>
          <label htmlFor="description">description:</label>
          <textarea
            type="text"
            name="description"
            required/>
          <label htmlFor="image">image</label>
          <input name="image"
                 type="file"
                 required/>
          <button type="submit">Create</button>
          <button onClick={::this.reset}>reset</button>
        </form>
      </section>
    )
  }
}

export default createContainer(NuanceForm, {
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
