import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../actions'

import About from '../components/About'

class AboutContainer extends Component {
  componentWillMount() {
    const { getPosts } = this.props
    this.retrieve().then(res =>  getPosts(res.splice(0, 10)))
  }

  render() {
    const { posts } = this.props

    return (
      <About
        posts={posts}
      />
    )
  }

  retrieve = () => {
    return axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.data)
  }
}

AboutContainer.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  posts: state.postsSection.posts
})

export default connect(
  mapStateToProps,
  {
    getPosts
  }
  )(AboutContainer)