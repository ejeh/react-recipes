import React from 'react';
import { Query } from "react-apollo";
import { GET_CURRENT_USER } from '../queries/index';


const WithSession = Component => props => {

  return (

    <div>

      <Query query={GET_CURRENT_USER}>

        {({data, loading, refetch}) => {

          // console.log(data)
          if(loading) return null;          

          return (

            <Component  {...props} refetch = {refetch}  session={data}/>
          )

        }}

      </Query>

    </div>
  )
}

export default WithSession;