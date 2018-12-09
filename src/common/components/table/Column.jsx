import React, { Component } from 'react'

class Column extends Component {
  render() {
    const { children, data, className } = this.props

    return <th>{children}</th>
  }
}

export default Column