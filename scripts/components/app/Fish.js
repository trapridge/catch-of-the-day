import React from 'react'

import Helpers from '../../helpers'

export default class Fish extends React.Component {
  constructor() {
    super()
    this.addToOrder = this.addToOrder.bind(this)
  }

  render() {
    let details = this.props.details
    let isAvailable = (details.status === 'available' ? true : false);
    let buttonText = (isAvailable ? 'Add to order' : 'Sold out!');
    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{Helpers.formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button onClick={this.addToOrder} 
                disabled={!isAvailable}>{buttonText}</button>
      </li>
    )
  }

  addToOrder() {
    this.props.addToOrder(this.props.index) // addToOrder in App
  }
}
