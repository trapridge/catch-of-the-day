import React from 'react'

import AddFishForm from './inventory/AddFishForm'

export default class Inventory extends React.Component {
  constructor() {
    super()
    this.renderInventoryItem = this.renderInventoryItem.bind(this)
  }

  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventoryItem)}
        <AddFishForm {...this.props} />
        {/* loadSamples in App */}
        <button onClick={this.props.loadSamples}>Load sample fishes</button>
      </div>
    )
  }

  renderInventoryItem(key) {
    const linkState = this.props.linkState  // linkState in App

    return (
      <div className="fish-edit" key={key}>
        <input type="text" 
          valueLink={linkState(`fishes.${key}.name`)} />
        <input type="text" 
          valueLink={linkState(`fishes.${key}.price`)} />
        <select valueLink={linkState(`fishes.${key}.status`)}>
          <option value="unavailable">Sold Out!</option>
          <option value="available">Fresh!</option>
        </select>
        <textarea valueLink={linkState(`fishes.${key}.desc`)}></textarea>
        <input type="text" 
          valueLink={linkState(`fishes.${key}.image`)} />
        <button 
          onClick={this.props.removeFish.bind(null, key)}>Remove fish</button>
      </div>
    )
  }
}
