import React, { Component } from 'react';

import './App.css';

import { Query } from "react-apollo";

import { GET_ALL_RECIPES } from "../queries";

import RecipeItem from './Recipe/RecipeItem';

import pose from "react-pose";

import Spinner from "../components/Spinner";


const RecipeList = pose.ul({

  show: {
    x: "0%",

    staggerChildren: "100%"
  },

  hidden: {
    x: "-100%"
  }

})


class App extends Component {

  state = {

    on: false
  }

  componentDidMount = () => {

    const { on } = this.state;
    setTimeout(() => {
      this.setState({ on: !on })

    }, 200)

  }


  render() {

    return (

      <div className='App'>

        <h1 className="main-title">

          Find Recipes you <strong>Love</strong>

        </h1>

        <Query query={GET_ALL_RECIPES}>

          {({ data, loading, error }) => {

            if (loading) return <Spinner />;

            if (error) return <div>Error</div>;

            const { on } = this.state;

            // console.log(data);
            return (

              <RecipeList 

              pose={ on ? "show" : "hidden"}

                className="cards"

              >

                {data.getAllRecipes.map((recipe) =>

                  <RecipeItem key={recipe._id}  {...recipe} />

                )}</RecipeList>
            )

          }}
        </Query>

      </div>


    )
  }

}


export default App;
