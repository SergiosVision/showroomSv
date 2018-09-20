import * as React from 'react'
import {Route, Switch, RouteComponentProps} from 'react-router-dom'

import SideBar from 'modules/SideBar/SideBar'
import ProfileContainer from 'modules/Profile/containers/ProfileContainer'

const cx = require('classnames/bind').bind(require('./styles/styles.scss'))

class IndexContainer extends React.Component<RouteComponentProps<{}>> {

    render() {
        return (
            <div className={cx('row', 'main')}>
                <div className={cx('column md-1', 'sidebar-wrapper')}>
                    <SideBar {...this.props} />
                </div>
                <div className={cx('column md-11', 'content-wrapper')}>
                    <Switch>
                        <Route path={`${this.props.match.path}profile`} component={ProfileContainer} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default IndexContainer
