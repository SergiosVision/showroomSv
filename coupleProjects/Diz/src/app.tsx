import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {Provider} from 'react-redux'
import {Route, Router, Switch} from 'react-router'

import {store, history} from 'store'

import IndexContainer from 'modules/Main/IndexContainer'
import Auth from 'modules/Auth/Auth'

import 'common/styles/base'

class Content extends React.Component<{}, {}> {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route path='/' component={IndexContainer} />
                        <Route path='/auth' component={Auth}/>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(
    <Content />,
    document.getElementById('content')
)