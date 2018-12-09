import React, { Component } from 'react'
import { history } from 'store'

import WorkPreviewCard from 'common/components/cards/previewCard/WorkPreviewCard'

class MainPage extends Component {
  render() {
    const { works } = this.props

    return (
      <div className='container'>
        {works ? (<div className='row'>
            {works.map(item => (
                <WorkPreviewCard title={item.title} key={item.id} className='col s6'
                handleClick={() => history.push(`/work/${item.id}`)}/>))}
            </div>) : <div className='row'>Loading...</div>}
      </div>
    )
  }
}

export default MainPage