import React, { Component } from 'react'
import { connect } from 'react-redux'

import { store } from 'store'

const defaultAuthContext = {
    authenticated: false,
    authStatusReported: false,
}
export const AuthContext = React.createContext(defaultAuthContext)

class AuthProvider extends Component {
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

export default connect(mapStateToProps, null)(AuthProvider)