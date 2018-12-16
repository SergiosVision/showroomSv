import React, { Component } from 'react'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { firestoreConnect } from 'react-redux-firebase'
import { history } from 'store'
import moment from 'moment'

import NewWork from '../components/NewWork'

class NewWorkContainer extends Component {
  render() {
    const { handleSubmit } = this.props

    return <NewWork onSubmitForm={handleSubmit(this.handleSubmitForm)}/>
  }

  handleSubmitForm = values => {
    const { firestore } = this.props
    const data = {
      id: values.unique_id,
      title: values.title,
      description: values.description,
      creation_date: moment(Date.now()).format('DD-MM-YY HH:mm')
    }

    firestore.set({collection: 'works', doc: values.unique_id}, data).then(() => history.push('/dashboard/works'))
  }
}

const NewWorkForm = reduxForm({
    form: 'NewWorkForm',
    initialValues: {
      unique_id: '',
      title: '',
      description: ''
    }
})(NewWorkContainer)

export default compose(firestoreConnect())(NewWorkForm)