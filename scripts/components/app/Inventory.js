import React from 'react'
import Autobind from 'autobind-decorator'
import * as Firebase from 'firebase'

import AddFishForm from './inventory/AddFishForm'
import Helpers from '../../helpers'

@Autobind
export default class Inventory extends React.Component {
  static propTypes = {
    fishes: React.PropTypes.objectOf(
      React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        desc: React.PropTypes.string.isRequired,
        image: React.PropTypes.string.isRequired,
      })
    ),
    loadSamples: React.PropTypes.func.isRequired,
    removeFish: React.PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      uid: undefined
    }
    Firebase.initializeApp(Helpers.getFirebaseConfig())
  }

  componentWillMount() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const storeRef = 
          Firebase.database().ref().child(this.props.params.storeId)
        storeRef.on('value', (snapshot) => {
          let data = snapshot.val() || {}

          if (!data.owner) {
            // Make current user the owner as no owner pre-exists
            storeRef.set({
              owner: user.uid
            })
          }

          this.setState({ 
            uid: user.uid,
            owner: data.owner || user.uid
          })
        })
      } else {
        this.setState({
          uid: null
        })
      }
    })

  }

  render() {
    const logoutButton = <button onClick={this.logout}>Log out</button>

    if (!this.state.uid) {
      return (
        <div>{this.renderLogin()}</div>
      )
    } 

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you aren't the owner of this store</p>
          {logoutButton}
        </div>
      )
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logoutButton}
        {Object.keys(this.props.fishes).map(this.renderInventoryItem)}
        <AddFishForm 
          {...this.props} />
        <button 
          onClick={this.props.loadSamples}>
          Load sample fishes
          </button>
      </div>
    )      
    
  }

  renderLogin() {
    return (
      <nav 
        className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button 
          className="github" 
          onClick={this.authenticate.bind(this, 'github')}>
          Log in with Github
        </button>
        <button 
          className="google" 
          onClick={this.authenticate.bind(this, 'google')}>
          Log in with Google
        </button>
        <button 
          className="twitter" 
          onClick={this.authenticate.bind(this, 'twitter')}>
          Log in with Twitter
        </button>
      </nav>
    )
  }

  renderInventoryItem(key) {
    return (
      <div 
        className="fish-edit" 
        key={key}>
        <input 
          type="text" 
          value={this.props.fishes[key].name}
          onChange={this.onInputChange.bind(this, key, 'name')} />
        <input 
          type="text" 
          value={this.props.fishes[key].price}
          onChange={this.onInputChange.bind(this, key, 'price')} />
        <select 
          value={this.props.fishes[key].status}
          onChange={this.onInputChange.bind(this, key, 'status')}>
          <option 
            value="unavailable">
            Sold Out!
          </option>
          <option 
            value="available">
            Fresh!
          </option>
        </select>
        <textarea 
          value={this.props.fishes[key].desc}
          onChange={this.onInputChange.bind(this, key, 'desc')}>
        </textarea>
        <input 
          type="text" 
          value={this.props.fishes[key].image}
          onChange={this.onInputChange.bind(this, key, 'image')} />
        <button 
          onClick={this.props.removeFish.bind(null, key)}>
          Remove fish
        </button>
      </div>
    )
  }

  onInputChange(key, detail, event) {
    this.props.fishes[key][detail] = event.target.value
    this.props.updateFishesState(this.props.fishes)
  }
  
  authenticate(providerName, event) {
    let provider
    switch (providerName) {
      case 'github':
        provider = new Firebase.auth.GithubAuthProvider()
        break
      case 'google':
        provider = new Firebase.auth.GoogleAuthProvider()
        break
      case 'twitter':
        provider = new Firebase.auth.TwitterAuthProvider()
        break
      default:
        return
    }
    Firebase.auth().signInWithPopup(provider)
      .catch(error => console.log(error))
  }

  logout() {
    Firebase.auth().signOut()
  }
}
