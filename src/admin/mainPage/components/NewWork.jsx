import React, { Component } from 'react'
import { Field } from 'redux-form'

import FormInput from 'common/components/formItems/FormInput'

class NewWork extends Component {
  render() {
    const { onSubmitForm } = this.props

    return (
      <div className='container'>
        <div className='row'>
          <form onSubmit={onSubmitForm}>
            <div className='row'>
              <Field
                name='title'
                placeholder='Title'
                component={FormInput}
              />
            </div>
            <button type='submit' className='btn blue-grey darken-3 z-depth-1'>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default NewWork