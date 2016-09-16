import React from 'react'
import { browserHistory } from 'react-router'

import Helpers from '../helpers'

export default class StorePicker extends React.Component {
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
