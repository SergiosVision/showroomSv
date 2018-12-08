import React, { Component } from 'react'

import { signIn } from 'firebaseConfig'

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
        const data = {name, password}

        if (name.length !== 0 && password.length !== 0) {
            signIn(data).then(res => console.log(res))

        } else {
            console.log('Suck Dick !!!')
        }
    }
}

export default SigninContainer