import React, { Component } from 'react'
import PropTypes from 'prop-types'

import WorkPreviewCard from 'common/components/cards/previewCard/WorkPreviewCard'

class MainPage extends Component {
  static propTypes = {
    works: PropTypes.array.isRequired
  }

  render() {
    const { works } = this.props

    return (
      <div className='container'>
        <div className='row'>
          {
            works && works.map(item => (
              <WorkPreviewCard className='col s6' title={item.title} key={item.id}/>
            ))
          }
        </div>
      </div>
    )
  }
}

export default MainPage