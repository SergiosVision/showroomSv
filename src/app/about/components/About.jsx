import React, { Component } from 'react'
import classnames from 'classnames'
import styles from '../styles/styles.sass'

const cx = classnames.bind(styles)

class About extends Component {
  render() {
    const { posts } = this.props

    return (
      <div className='container'>
        {
         posts && posts.map((item, index) => (
              <div key={index}>
                <h1>{item.title}</h1>
                <br />
                <p>{item.body}</p>
              </div>
            ))
        }
      </div>
    )
  }
}

export default About