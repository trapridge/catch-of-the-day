import React from 'react'
import Autobind from 'autobind-decorator'
import ReactCssTransitionGroup from 'react-addons-css-transition-group'

import Helpers from '../../helpers'

@Autobind
export default class Order extends React.Component {
  static propTypes = {
    order: React.PropTypes.objectOf(React.PropTypes.number.isRequired),
    fishes: React.PropTypes.objectOf(
      React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        desc: React.PropTypes.string.isRequired,
        image: React.PropTypes.string.isRequired,
      })
    ),
    removeFromOrder: React.PropTypes.func.isRequired,
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
        <ReactCssTransitionGroup className="order" component="ul" 
          transitionName="order" transitionEnterTimeout={500} 
          transitionLeaveTimeout={500}>
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {Helpers.formatPrice(total)}
          </li>
        </ReactCssTransitionGroup>
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
        <span>
          <ReactCssTransitionGroup component="span" transitionName="count" transitionLeaveTimeout={250} transitionEnterTimeout={250}>
            <span key={count}>{count}</span>  
          </ReactCssTransitionGroup>
           kg {fish.name}
        </span>
        <span className="price">
          {Helpers.formatPrice(count * parseInt(fish.price))}
        </span>
        {removeButton}
      </li>
    )
  }
}
