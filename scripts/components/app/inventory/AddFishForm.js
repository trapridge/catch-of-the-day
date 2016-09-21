import React from 'react'

import Autobind from 'autobind-decorator'

@Autobind
export default class AddFishForm extends React.Component {
  static propTypes = {
    addFish: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <form 
        className="fish-edit" 
        ref="fishForm" 
        onSubmit={this.createFish}>
        <input 
          type="text" 
          ref="name" 
          placeholder="Fish name" />
        <input 
          type="text" 
          ref="price" 
          placeholder="Fish price" />
        <select 
          ref="status">
          <option 
            value="available">
            Fresh!
          </option>
          <option 
            value="unavailable">
            Sold out!
          </option>
        </select>
        <textarea 
          type="text" 
          ref="desc" 
          placeholder="Desc">
        </textarea>
        <input 
          type="text" 
          ref="image" 
          placeholder="URL to image" />
        <button 
          type="submit">
          + Add item
        </button>
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
    this.props.addFish(fish)  // addFish in App
    this.refs.fishForm.reset()
  }
}
