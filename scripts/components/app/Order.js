import React from 'react'

import Helpers from '../../helpers'

export default class Order extends React.Component {
  constructor() {
    super()
    this.renderOrder = this.renderOrder.bind(this)
  }

  render() {
    let orderIds = Object.keys(this.props.order)
    let total = orderIds.reduce((prevTotal, key) => {
      let fish = this.props.fishes[key] // fishes in App
      let count = this.props.order[key] // order in App
      let isAvailable = (fish && fish.status === 'available')
      
      if (fish && isAvailable) {
        return prevTotal + ((count * parseInt(fish.price)) || 0)
      }
      return prevTotal
    }, 0)

    return (
      <div className="order-wrap">
        <h2 className="order-title">Your order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {Helpers.formatPrice(total)}
          </li>
        </ul>
      </div>
    )
  }

  renderOrder(key) {
    let fish = this.props.fishes[key]
    let count = this.props.order[key]
    const removeButton = <button 
      onClick={this.props.removeFromOrder.bind(null, key)}>&times;</button>

    if (!fish) {
      return <li key={key}>Sorry, fish no longer available! {removeButton}</li>
    }

    return (
      <li key={key}>
        {count} kg {fish.name}
        <span className="price">
          {Helpers.formatPrice(count * fish.price)}
        </span>
        {removeButton}
      </li>
    )
  }
}
