import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import NewWork from '../components/NewWork'

class NewWorkContainer extends Component {
  render() {
    return <NewWork/>
  }
}

const NewWorkForm = reduxForm({
    form: 'NewWorkForm',
})(NewWorkContainer)

export default NewWorkForm