import React, { Component } from 'react'

import { Auth } from 'firebaseConfig'

const defaultFbContext = {
    authStatusReported: false,
    isUserSignedIn: false
}
export const FbContext = React.createContext(defaultFbContext)

class AProvider extends Component {
    state = defaultFbContext

    componentDidMount() {
        Auth.onAuthStateChanged(user => this.setState({
            authStatusReported: true,
            isUserSignedIn: !!user
        }))
    }
    
    render() {
        const { isUserSignedIn, authStatusReported } = this.state

        return (
            <FbContext.Provider value={{isUserSignedIn, authStatusReported}}>
                {authStatusReported && this.props.children}
            </FbContext.Provider>
        )
    }
}

export default AProvider