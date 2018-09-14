import React, {Component} from 'react';
import { connect } from "react-redux";
import { signIn } from "../../actions/signIn";
import PropTypes from "prop-types";

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    };

    onChangeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    onSubmitHandler = e => {
        e.preventDefault();
        const { signIn } = this.props;

        const { email, password } = this.state;

        const authData = {email, password};

        signIn(authData)
    };

    componentWillUpdate(nextProps) {
        const { history } = this.props;
        if (nextProps.auth) {
            history.push('/');
        }
    }

    render() {
        return (
            <div className='row'>
                <form className='col s4 offset-s4' style={{marginTop: 50}} onSubmit={this.onSubmitHandler}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email"
                                   name='email'
                                   required type="email"
                                   placeholder='Email'
                                   onChange={this.onChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password"
                                   name='password'
                                   required type="password"
                                   placeholder='Password'
                                   onChange={this.onChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <button className='btn-small col s12'>Signin</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return { auth }
};


export default connect(
    mapStateToProps, { signIn }
)(SignIn);