import React from 'react'
import Autobind from 'autobind-decorator'

@Autobind
export default class Header extends React.Component {
  static propTypes = {
    tagline: React.PropTypes.string.isRequired
  }

  render() {
    return (
      <header 
        className="top">
        <h1>
          Catch 
          <span 
            className="ofThe">
            <span 
              className="of">
              of
            </span> 
            <span 
              className="the">
              the
            </span>
          </span> 
          day
        </h1>
        <h3 
          className="tagline">
          <span>{this.props.tagline}</span>
        </h3>
      </header>
    )
  }
}
