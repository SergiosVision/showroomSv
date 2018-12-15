import React, { Component } from 'react'
import { compose } from 'redux'
import { history } from 'store'

import { firebaseConnect } from 'react-redux-firebase'

import Signin from '../components/Signin';

class SigninContainer extends Component {
    state = {
        name: '',
        password: ''
    }

    render() {
        return (
            <Signin onChangeEvent={this.handleChangeEvent}
                    onSubmitForm={this.handleSubmitForm}
            />
        )
    }

    handleChangeEvent = e => this.setState({[e.currentTarget.name]: e.currentTarget.value})

    handleSubmitForm = e => {
        e.preventDefault()

        const { name, password } = this.state
        const data = {email: name.trim() , password: password.trim()}

        this.props.firebase.login(data)
            .then(() => console.log('Success'))
            .catch((error) => console.log(error))

    }
}

export default compose(firebaseConnect())(SigninContainer)