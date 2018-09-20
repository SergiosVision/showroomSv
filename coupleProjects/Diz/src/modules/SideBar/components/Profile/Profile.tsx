import * as React from 'react'
import { RouteComponentProps, Link} from 'react-router-dom'

const NotificationsIcon = require(`!svg-react-loader?name=Icon!common/icons/bell.svg`)

const cx = require('classnames/bind').bind(require('./styles/styles.scss'))

interface Props {}

class Profile extends React.Component<Props> {
    state = {
        photoURL: ''
    }
    render() {
        const { photoURL } = this.state
        return (
            <div className={cx('nav-profile')}>
                <div className={cx('notifications', 'mb-20')}>
                    <NotificationsIcon />
                </div>
                <div className={cx('profile-icon')}>
                    <Link to='/profile' className={cx('profile-link')}>
                        {
                            photoURL
                                ?
                                <div className={cx('profile-img')}>
                                    <img src={photoURL}/>
                                </div>
                                :
                                <div className={cx('profile-img')}/>
                        }
                    </Link>
                </div>
            </div>
        )
    }
}

export default Profile
