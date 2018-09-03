import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import Search from './components/Recipe/Search';
import WithSession from "./components/WithSession";
import Navbar from './components/Navbar';
import AddRecipe from "./components/Recipe/AddRecipe";
import Profile from "./components/Profile/Profile";
import RecipePage from './components/Recipe/RecipePage';
import './index.css';
import App from './components/App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";



const client = new ApolloClient({

    uri: 'http://localhost:4445/graphql',

    fetchOptions: {
        credentials: 'include'
    },

    request: operation => {
        const token = localStorage.getItem("Token");
        operation.setContext({

            headers: {

                authorization: token
            }
        })
    },
    onError: ({ networkError }) => {

        if (networkError) {
            // localStorage.setItem('token', '')

            // console.log('Network Error', networkError);

            if (networkError.statusCode === 401) {
                networkError.removeItem('token');
            }
        }
    }

});


const Root = ({ refetch, session}) => (

    <Router>

        <Fragment>

        <Navbar session= {session}/>

        <Switch>

            <Route path='/' component={App} exact />

            <Route path='/search' component={Search} />            

            <Route path='/signin' render={() => <Signin  refetch = {refetch}/>} />

            <Route path='/signup' render={() => <Signup refetch = {refetch} />} />

            <Route path='/recipe/add'render = {() =>  <AddRecipe  session = {session}/>}/>   

            <Route path='/profile' render={() => <Profile  session = {session}/>} />   

            <Route path='/recipes/:_id' component={RecipePage} />   
            
            
            <Redirect to="/" />

        </Switch>

        </Fragment>

    </Router>
)
const RootWithSession = WithSession(Root)


ReactDOM.render(

    <ApolloProvider client={client}>

        <RootWithSession />

    </ApolloProvider>,

    document.getElementById('root'));
