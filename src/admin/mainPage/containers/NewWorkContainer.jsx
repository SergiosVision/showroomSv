import React, { Component } from 'react'
import { reduxForm, su } from 'redux-form'

import NewWork from '../components/NewWork'

class NewWorkContainer extends Component {
  render() {
    const { handleSubmit } = this.props

    return <NewWork onSubmitForm={handleSubmit(this.handleSubmitForm)}/>
  }

  handleSubmitForm = values => {
    console.log(values)
  }
}

const NewWorkForm = reduxForm({
    form: 'NewWorkForm',
    initialValues: {
      title: ''
    }
})(NewWorkContainer)

export default NewWorkForm