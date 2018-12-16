import React, { Component } from 'react'

import moment from 'moment'

import Loader from 'common/components/loader/Loader'

import CardLayout from 'admin/common/components/cards/CardLayout'

class Location extends Component {
  render() {
    const { location } = this.props
    let content

    if (location) {
        content = (
            <div className="card-content white-text">
                <span className="card-title">{this.GetCurrentDay()}</span>
                <div><p>{this.composeDataString()}</p></div>
            </div>
        )
    } else {
        content = <Loader absoluteCenter/>
    }

    return (
        <CardLayout>{content}</CardLayout>
    )
  }

  composeDataString = () => `${this.getFullDate()} ${this.getLocation()}`

  getLocation = () => `${this.props.location.city}, ${this.props.location.country}`

  getFullDate = () => moment(Date.now()).format('DD dddd, YYYY')

  GetCurrentDay = () => moment(Date.now()).format('dddd')
}

export default Location