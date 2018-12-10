import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import { Auth } from 'firebaseConfig'

import Success from './Success'
import Fail from './Fail'

class ProtectedRoute extends Component {
    componentWillMount() {
        this.renderSuccess()
    }

    render() {
        const { path, exact, authenticated } = this.props
        const current = Auth.currentUser

        return <Route exact={exact} path={path} render={props => 
           (current && authenticated) ? this.renderSuccess(props) : this.renderFail(this.props)} />
    }

    findChild = (whatFind, props) => {
        let output

        React.Children.forEach(this.props.children, child => {
            if (child && child.type === whatFind) {
                output = React.cloneElement(child.props.children, {...props})
            }
        })
        
        return output
    }

    renderSuccess = props => this.findChild(Success, props)

    renderFail = props => this.findChild(Fail, props)
}

export default ProtectedRoute