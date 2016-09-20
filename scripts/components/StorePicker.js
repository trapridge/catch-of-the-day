import React from 'react'
import Autobind from 'autobind-decorator'
import { browserHistory } from 'react-router'

import Helpers from '../helpers'

@Autobind
export default class StorePicker extends React.Component {
  static propTypes = {}

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
