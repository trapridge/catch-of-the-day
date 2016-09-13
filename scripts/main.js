import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import Helpers from './helpers'
import { samples } from './sample-fishes'

class App extends React.Component {
  constructor() {
    super()
    this.addFish = this.addFish.bind(this)
    this.loadSamples = this.loadSamples.bind(this)
    this.renderFish = this.renderFish.bind(this)
    this.state = {
      fishes: {},
      order: {}
    }
  }

  addFish(fish) {
    const timestamp = (new Date()).getTime()
    this.state.fishes['fish-' + timestamp] = fish
    this.setState({ 
      fishes: this.state.fishes 
    })
  }

  loadSamples() {
    this.setState({
      fishes: samples
    }) 
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="whatever"/>
          <ul className="list-of-fishes">
           {Object.keys(this.state.fishes).map(this.renderFish)} 
          </ul>
        </div>
        <Order/>
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
      </div>
    )
  }

  renderFish(key) {
    return (
      <Fish key={key} index={key} details={this.state.fishes[key]}/>
    )
  }
}

class Fish extends React.Component {
  render() {
    var details = this.props.details
    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{Helpers.formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
      </li>
    )
  }
}

class Header extends React.Component {
  render() {
    return (
      <header className="top">
        <h1>
          Catch 
          <span className="ofThe">
            <span className="of">of</span> 
            <span className="the">the</span>
          </span> 
          day
        </h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>
      </header>
    )
  }
}
  
class Order extends React.Component {
  render() {
    return (
      <p>order</p>
    )
  }
}

class Inventory extends React.Component {
  render() {
    return (
      <div>
        <h2>Inventory</h2>
        <AddFishForm {...this.props}/>
        <button onClick={this.props.loadSamples}>Load sample fishes</button>
      </div>
    )
  }
}

class AddFishForm extends React.Component {
  constructor() {
    super()
    this.createFish = this.createFish.bind(this)
  }

  render() {
    return (
      <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
        <input type="text" ref="name" placeholder="Fish name"/>
        <input type="text" ref="price" placeholder="Fish price"/>
        <select ref="status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold out!</option>
        </select>
        <textarea type="text" ref="desc" placeholder="Desc"></textarea>
        <input type="text" ref="image" placeholder="URL to image"/>
        <button type="submit">+ Add item</button>
      </form>
    )
  }

  createFish(event) {
    event.preventDefault()
    const fish = { 
      name: this.refs.name.value,
      price: this.refs.price.value,
      status: this.refs.status.value,
      desc: this.refs.desc.value,
      image: this.refs.image.value
    }
    this.props.addFish(fish)
    this.refs.fishForm.reset()
  }
}

class StorePicker extends React.Component {
  constructor() {
    super()
    this.goToStore = this.goToStore.bind(this)
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        {/* comment */}
        <h2>Please enter a store</h2>
        <input type="text" 
                ref="storeId" 
                defaultValue={Helpers.getFunName()} 
                required />
        <input type="submit" />
      </form>
    )

  }

  goToStore(event) {
    event.preventDefault()
    browserHistory.push(`/store/${this.refs.storeId.value}`)
  }
}

class NoMatch extends React.Component {
  render() {
    return (
      <h1>404</h1>
    )
  }
}
 
const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={StorePicker}/>
    <Route path="/store/:storeId" component={App}/>
    <Route path="*" component={NoMatch}/>
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'))

