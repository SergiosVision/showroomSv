import React, { Component } from 'react'

import styles from '../styles/.module.sass'

const cx = require('classnames/bind').bind(styles)

class Signup extends Component {
  render() {
    const { onChangeEvent, onSubmitForm } = this.props
 
    return (
      <div className={cx('container', 'custom-container')}>
        <div className='row'>
            <div className={cx('card col s4 offset-s4 z-depth-3 blue-grey darken-3', 'custom')}>
                <div className='card-content'>
                    <form onSubmit={onSubmitForm}>
                        <div className='row'>
                            <div className='input-field col s12'>
                                <input name='name' placeholder='Name' type='text'
                                 onChange={onChangeEvent} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='input-field col s12'>
                                <input name='password' placeholder='Password' type='password'
                                 onChange={onChangeEvent} />
                            </div>
                        </div>
                        <button type='submit' className='btn blue-grey darken-3 z-depth-1'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Signup