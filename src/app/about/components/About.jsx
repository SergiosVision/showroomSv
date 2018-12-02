import React, { Component } from 'react'

class About extends Component {
  render() {
    const { posts } = this.props

    return (
      <div>
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