import React from 'react';

import { Query } from "react-apollo";
import { GET_CURRENT_USER } from '../queries/index';
import { Redirect } from 'react-router-dom';



const WithAuth = Conditionalfunc => Component => props => (

  <Query query={GET_CURRENT_USER}>

  {({ data, loading } ) => {

    if(loading) return null;

    return Conditionalfunc(data) ? <Component  {...props}/> : <Redirect to='/' />

  }}


  </Query>
)

export default WithAuth;