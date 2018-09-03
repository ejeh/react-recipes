import React from 'react'
import ApolloConsumer from 'react-apollo/ApolloConsumer';
import { withRouter } from 'react-router-dom';



const handleSignout = (client, history) =>{

    localStorage.setItem('Token', '');

    client.resetStore();

    history.push('/');

    // console.log(client);

}
const Signout = ({history}) => {

    return (
        <ApolloConsumer>

            {client => {

                return (

                    <button onClick={() => handleSignout(client, history)}>Signout</button>

                )
            }}

        </ApolloConsumer>
    )
}

export default withRouter(Signout);