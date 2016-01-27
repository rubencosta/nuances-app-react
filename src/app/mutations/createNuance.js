import Relay, { Mutation } from 'react-relay'

export default class CreateNuanceMutation extends Mutation {
  static fragments = {
    user: () => Relay.QL`
        fragment on User{
            id
        }
    `,
    word: () => Relay.QL`
        fragment on Word{
            id
        }
    `
  };

  getMutation() {
    return Relay.QL`
        mutation {
            createNuance
        }
    `
  }

  getVariables() {
    return {
      user: this.props.user.id,
      word: this.props.word.id,
      description: this.props.description,
    }
  }

  getFiles() {
    return {
      image: this.props.image,
    }
  }

  getFatQuery(){
    return Relay.QL`
        fragment on CreateNuancePayload{
            nuance
            user
        }
    `
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          user: this.props.user.id,
        }
      }]
  }
}
