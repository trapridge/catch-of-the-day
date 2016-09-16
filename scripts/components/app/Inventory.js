import React from 'react'
import Catalyst from 'react-catalyst' // two way data flow
import reactMixin from 'react-mixin'  // mixins in ES6

import AddFishForm from './inventory/AddFishForm'

export default class Inventory extends React.Component {
  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm {...this.props} />
        {/* loadSamples in App */}
        <button onClick={this.props.loadSamples}>Load sample fishes</button>
      </div>
    )
  }

  renderInventory(key) {
    return (
      <div className="fish-edit" key={key}>
        <input type="text" valueLink={linkState(`fishes.${key}.name`)} />
      </div>
    )
  }
}

reactMixin.onClass(Inventory, Catalyst.LinkedStateMixin)
