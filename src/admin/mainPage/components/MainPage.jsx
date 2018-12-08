import React, { Component } from 'react'

import { signOut } from 'firebaseConfig'

class MainPage extends Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          Main page Admin
          <div onClick={this.logOut}>Logout</div>
        </div>
      </div>
    )
  }

  logOut = () => {
    signOut()
  }
}

export default MainPage