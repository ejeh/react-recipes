import React, { Component } from 'react'
import Mutation from 'react-apollo/Mutation';
import { SIGNIN_USER } from '../../queries/index';
import { withRouter } from "react-router-dom";

import Error from '../Error';



const initialState = {

  username: "",

  password: ""
}


class Signin extends Component {

  state = {...initialState}


  clearState = () =>{
    this.setState({ ...initialState })
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value })
  }

  handleSubmit = (e, signinUser) => {

    e.preventDefault();

    signinUser().then( async ({data}) => {

      localStorage.setItem('Token', data.signinUser.token);

      await this.props.refetch();

      this.clearState();

     this.props.history.push('/')
      
    })

  }

  validForm = () => {
    const { username, password } = this.state

    const invalidate = !username || !password;

    return invalidate;
  }

  render() {
    const { username, password } = this.state

    return (

      <div className="App">

        <h2 className="App">Signin</h2>

        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>

          {(signinUser, { data, loading, error }) => {

            return (

              <form className="form" onSubmit={e => this.handleSubmit(e, signinUser)}>

                <input type='text' name="username" placeholder="Username" onChange={this.handleChange} value={username}
                />

                <input type='password' name="password" placeholder="Password" onChange={this.handleChange} value={password}
                />

                <button

                  disabled={loading || this.validForm()}

                  type="submit"

                  className="button-primary">

                  submit

             </button>


                {error && (
                  <Error error={error} />
                )
                }
              </form>
            )

          }}




        </Mutation>

      </div>
    )
  }
}

export default (withRouter(Signin));