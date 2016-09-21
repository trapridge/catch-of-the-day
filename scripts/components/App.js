import React from 'react'
import Rebase from 're-base'          // data persistence with firebase
import Autobind from 'autobind-decorator'

import Header from './app/Header'
import Fish from './app/Fish'
import Order from './app/Order'
import Inventory from './app/Inventory'
import { samples } from '../sample-fishes'
import Helpers from '../helpers'

const rebase = Rebase.createClass(Helpers.getFirebaseConfig())

@Autobind
export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      fishes: {},
      order: {} 
    }
  }

  /* Lifecycle methods */

  componentDidMount() {
    rebase.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes' 
    })
    this.restoreOrderFromLocalStorage()
  }

  restoreOrderFromLocalStorage() {
    let order = localStorage.getItem(`order-${this.props.params.storeId}`)
    if (order) {
      this.setState({
        order: JSON.parse(order)
      })
    }    
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(
      `order-${this.props.params.storeId}`, 
      JSON.stringify(nextState.order)
    )
  }

  /* Rendering methods */

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fancy tagline" />
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(this.renderFish)} 
          </ul>
        </div>
        <Order 
          removeFromOrder={this.removeFromOrder} 
          fishes={this.state.fishes} 
          order={this.state.order} />
        <Inventory 
          addFish={this.addFish} 
          removeFish={this.removeFish} 
          loadSamples={this.loadSamples} 
          fishes={this.state.fishes} 
          updateFishesState={this.updateFishesState}
          {...this.props} />
      </div>
    )
  }

  renderFish(key) {
    return (
      <Fish addToOrder={this.addToOrder} key={key} index={key} 
        details={this.state.fishes[key]} />
    )
  }

  /* Custom methods */

  addFish(fish) {
    const timestamp = (new Date()).getTime()
    this.state.fishes['fish-' + timestamp] = fish
    this.setState({ 
      fishes: this.state.fishes 
    })
  }

  removeFish(key) {
    if (confirm('Are you sure?')) {
      this.state.fishes[key] = null
      this.setState({
        fishes: this.state.fishes
      })
    }
  }

  addToOrder(key) {
    this.state.order[key] = this.state.order[key] + 1 || 1
    this.setState({ 
      order: this.state.order 
    })
  }

  removeFromOrder(key) {
    delete this.state.order[key]
    this.setState({
      order: this.state.order
    })
  } 

  loadSamples() {
    this.setState({
      fishes: samples
    }) 
  }

  updateFishesState(fishes) {
    this.setState({ fishes })
  }
}
