import React, { Component } from 'react'
import { connect } from 'react-redux'

import { store } from 'store'

import { Auth } from 'firebaseConfig'

import { setUser } from 'common/actions/auth'

const defaultAuthContext = {
    authenticated: store.getState().auth.authenticated,
    authStatusReported: store.getState().auth.authStatusReported,
}
export const AuthContext = React.createContext(defaultAuthContext)

class AuthProvider extends Component {
    componentDidMount() {
        Auth.onAuthStateChanged(user => this.props.setUser(!!user))
    }
    
    render() {
        const { authenticated, authStatusReported } = this.props

        return (
            <AuthContext.Provider value={{authenticated, authStatusReported}}>
                {authStatusReported && this.props.children}
            </AuthContext.Provider>
        )
    }
}

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
    authStatusReported: state.auth.authStatusReported
})

export default connect(mapStateToProps, { setUser })(AuthProvider)