import React from 'react'
import Autobind from 'autobind-decorator'

@Autobind
export default class NoMatch extends React.Component {
  render() {
    return (
      <h1>404</h1>
    )
  }
}
