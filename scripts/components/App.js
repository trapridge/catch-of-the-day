import React from 'react'
import Rebase from 're-base'          // data persistence with firebase
import Catalyst from 'react-catalyst' // two way data flow
import reactMixin from 'react-mixin'  // mixins in ES6

import Header from './app/Header'
import Fish from './app/Fish'
import Order from './app/Order'
import Inventory from './app/Inventory'

import { samples } from '../sample-fishes'

const base = Rebase.createClass({
  apiKey: 'AIzaSyAP1s9hYKefytL01shHNegEbrB4bO59nJQ',
  authDomain: 'catch-of-the-day-18f2e.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-18f2e.firebaseio.com',
  storageBucket: 'catch-of-the-day-18f2e.appspot.com',
  messagingSenderId: '23941976250'
})

export default class App extends React.Component {
  constructor() {
    super()
    this.addFish = this.addFish.bind(this)
    this.removeFish = this.removeFish.bind(this)
    this.addToOrder = this.addToOrder.bind(this)
    this.removeFromOrder = this.removeFromOrder.bind(this)
    this.loadSamples = this.loadSamples.bind(this)
    this.renderFish = this.renderFish.bind(this)
    this.linkState = this.linkState.bind(this)
    this.state = {
      fishes: {},
      order: {} 
    }
  }

  /* Lifecycle methods */

  componentDidMount() {
    base.syncState(`${this.props.params.storeId}/fishes`, {
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
          <Header tagline="whatever"/>
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(this.renderFish)} 
          </ul>
        </div>
        <Order removeFromOrder={this.removeFromOrder} 
          fishes={this.state.fishes} order={this.state.order} />
        <Inventory addFish={this.addFish} removeFish={this.removeFish} 
          loadSamples={this.loadSamples} fishes={this.state.fishes} 
          linkState={this.linkState} />
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
}

reactMixin.onClass(App, Catalyst.LinkedStateMixin)
