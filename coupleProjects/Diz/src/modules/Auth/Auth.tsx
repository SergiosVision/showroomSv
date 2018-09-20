import * as React from 'react'
import {Route, Switch, RouteComponentProps, Link} from 'react-router-dom'

import SignInContainer from 'modules/Auth/SignIn/containers/SignInContainer'
import SignInUpMerchant from 'modules/Auth/SignUpMerchant/containers/SignUpMerchantContainer'
import SignInUpEmployee from 'modules/Auth/SignUpEmployee/containers/SignUpEmployeeContainer'
import ForgotPasswordContainer from 'modules/Auth/ForgotPassword/containers/ForgotPasswordContainer'
import ResetPasswordContainer from 'modules/Auth/ResetPassword/containers/ResetPasswordContainer'

const Logo = require(`!svg-react-loader?name=Icon!common/img/logo.svg`)

const cx = require('classnames/bind').bind(require('./styles.scss'))

class Auth extends React.Component<RouteComponentProps<{}>> {

    render() {
        return (
            <div className='container'>
                <div className={cx('auth-container')}>
                    <div className={cx('logo-holder')}>
                        <Link to='/auth'>
                            <Logo />
                        </Link>
                    </div>
                    <Switch>
                        <Route exact path={`${this.props.match.path}/`} component={SignInContainer} />
                        <Route exact path={`${this.props.match.path}/signupmerch`} component={SignInUpMerchant} />
                        <Route exact path={`${this.props.match.path}/signupempl`} component={SignInUpEmployee} />
                        <Route exact path={`${this.props.match.path}/forgotpassword`} component={ForgotPasswordContainer} />
                        <Route exact path={`${this.props.match.path}/resetpassword`} component={ResetPasswordContainer} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default Auth
