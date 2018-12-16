import React, { Component } from 'react'
import { Field } from 'redux-form'

import { required, maxLength10, maxLength30, maxLength100 } from 'common/utils/inputValidation'
import FormInput from 'common/components/formItems/FormInput'

import TopLine from 'admin/common/components/outsidePageLayout/TopLine'
import OutsidePageLayout from 'admin/common/components/outsidePageLayout/OutsidePageLayout'
import Button from 'admin/common/components/button/Button'
import ButtonsHolderLayout from 'admin/common/components/buttonsHolderLayout/ButtonsHolderLayout'

import styles from '../styles/.styles.sass'

const cx = require('classnames/bind').bind(styles)

class NewWork extends Component {
  render() {
    const { onSubmitForm } = this.props

    return (
      <React.Fragment>
        <TopLine>
          <ButtonsHolderLayout back={{path: '/dashboard/works', text: 'Works'}}>
            <Button clickEvent={onSubmitForm} icon='fa-plus'>Save</Button>
          </ButtonsHolderLayout>
        </TopLine>
        <OutsidePageLayout>
          <div className='row'>
            <form>
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
            </form>
          </div>
        </OutsidePageLayout>
      </React.Fragment>
    )
  }
}

export default NewWork