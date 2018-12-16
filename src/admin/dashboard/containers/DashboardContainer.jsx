import React, { Component } from 'react'
import axios from 'axios'

import { WEATHER_KEY } from 'firebaseConfig/keys'

import Dashboard from '../components/Dashboard'

export class DashboardContainer extends Component {
  state = {
    location: undefined
  }

  componentWillMount() {
   this.requestLocation()
  }

  render() {
    const { location } = this.state

    return <Dashboard location={location}/>
  }

  requestLocation = () => {
   axios.get('http://ip-api.com/json', {params: {fields: 'city,country'}})
      .then(res => this.setState({location: res.data}))
      .catch(error => console.log(error))
  }
}

export default DashboardContainer
