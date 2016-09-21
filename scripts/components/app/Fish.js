import React from 'react'
import Autobind from 'autobind-decorator'

import Helpers from '../../helpers'

@Autobind
export default class Fish extends React.Component {
  static propTypes = {
    addToOrder: React.PropTypes.func.isRequired,
    index: React.PropTypes.string.isRequired,
    details: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      price: React.PropTypes.string.isRequired,
      status: React.PropTypes.string.isRequired,
      desc: React.PropTypes.string.isRequired,
      image: React.PropTypes.string.isRequired,
    })
  }

  render() {
    let details = this.props.details
    let isAvailable = (details.status === 'available' ? true : false);
    let buttonText = (isAvailable ? 'Add to order' : 'Sold out!');
    return (
      <li 
        className="menu-fish">
        <img 
          src={details.image} 
          alt={details.name} />
        <h3 
          className="fish-name">
          {details.name}
          <span 
            className="price">
            {Helpers.formatPrice(details.price)}
          </span>
        </h3>
        <p>{details.desc}</p>
        <button 
          onClick={this.addToOrder} 
          disabled={!isAvailable}>
          {buttonText}
        </button>
      </li>
    )
  }

  addToOrder() {
    this.props.addToOrder(this.props.index) // addToOrder in App
  }
}
