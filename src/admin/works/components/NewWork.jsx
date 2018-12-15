import React, { Component } from 'react'
import { Field } from 'redux-form'

import { required, maxLength10, maxLength30, maxLength100 } from 'common/utils/inputValidation'
import FormInput from 'common/components/formItems/FormInput'

class NewWork extends Component {
  render() {
    const { onSubmitForm } = this.props

    return (
      <div className='container'>
        <div className='row'>
          <form onSubmit={onSubmitForm}>
            <div className='row'>
              <Field name='unique_id'
                placeholder='Unique Id'
                validate={[required, maxLength10]}
                component={FormInput}
              />
            </div>
            <div className='row'>
              <Field name='title'
                placeholder='Title'
                validate={[required, maxLength30]}
                component={FormInput}
              />
            </div>
            <div className='row'>
              <Field name='description'
                placeholder='Description'
                validate={[required, maxLength100]}
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