import React, { Component } from 'react'
import Mutation from 'react-apollo/Mutation';
import { SIGNUP_USER } from '../../queries/index';
import Error from "../Error";
import { withRouter } from 'react-router-dom';

const initialState = {
    username: '',

    email: '',

    password: '',

    confirmPassword: ''
}
class Signup extends Component {

    state = { ...initialState };

    clearState = () => {
        this.setState({ ...initialState })

    }

    handleChange = (e) => {

        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    handleSubmit = (event, SignupUser) => {

        event.preventDefault();

        SignupUser().then(async ({ data }) => {

            // console.log(data);

            localStorage.setItem('Token', data.signupUser.token);

            await this.props.refetch();

            this.clearState();

            this.props.history.push('/');


        })
    }

    validateForm = () => {
        const { username, email, password, confirmPassword } = this.state;

        const invalidate = !username || !email || !password || password !== confirmPassword

        return invalidate
    }

    render() {
        const { username, email, password, confirmPassword } = this.state

        return (

            <div className="App">

                <h2 className="App">Signup</h2>

                <Mutation mutation={SIGNUP_USER} variables={{ username, email, password }}>

                    {(SignupUser, { data, loading, error }) => {

                        return (

                            <form className="form" onSubmit={event => this.handleSubmit(event, SignupUser)}>

                                <input type="text" name='username' onChange={this.handleChange} value={username} placeholder='Username'
                                />

                                <input type="email" name='email' onChange={this.handleChange} value={email} placeholder='Email Address'
                                />

                                <input type="password" name='password' onChange={this.handleChange} value={password} placeholder='Password'
                                />

                                <input type="password" name='confirmPassword' onChange={this.handleChange} value={confirmPassword} placeholder='Confirm Password'
                                />

                                <button
                                    type="submit"

                                    disabled={loading || this.validateForm()}

                                    className='button-primary'>

                                    Submit

                                 </button>

                                {error && <Error error={error} />}
                            </form>
                        )
                    }}


                </Mutation>

            </div>
        )
    }
}

export default (withRouter(Signup));