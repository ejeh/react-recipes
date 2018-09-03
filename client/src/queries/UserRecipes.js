import React from 'react'

import { Query } from 'react-apollo';

import { GET_USER_RECIPES, DELETE_USER_RECIPE, GET_ALL_RECIPES, GET_CURRENT_USER } from './index';
import { Link } from 'react-router-dom';
import Mutation from 'react-apollo/Mutation';
import Spinner from '../components/Spinner';


const handleDelete = (deleteUserRecipe) =>{

    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');

    if(confirmDelete){

        deleteUserRecipe().then(({ data }) =>{
            
            // console.log(data)

        });


    }

}


const UserRecipes = ({ username }) => (

    <Query query={GET_USER_RECIPES} variables={{ username }}>

        {({ data, loading, error }) => {

            if (loading) return <Spinner />;

            if (error) return <div>Error</div>

            // console.log(data)

            return (

                <div className="App">

                    <ul>

                        <h3>Your Recipes</h3>

                        {data.getUserRecipes.length === 0 && <p><strong>You have not added any recipe yet</strong></p>}

                        {data.getUserRecipes.map(recipe => (

                            <li key={recipe._id}>

                                <Link to={`/recipes/${recipe._id}`}><p>{recipe.name}</p></Link>

                                <p style={{ marginBottom: 0 }}>Likes: {recipe.likes}</p>



                                <Mutation

                                mutation={DELETE_USER_RECIPE}

                                variables={{ _id: recipe._id }}

                                refetchQueries={()=> [

                                    { query: GET_ALL_RECIPES },

                                    { query: GET_CURRENT_USER }
                                ]}

                                  // Optimistic UI

                                update = {( cache, {data: {deleteUserRecipe } }) => {

                                    const {getUserRecipes} = cache.readQuery({ 
                                        
                                        query: GET_USER_RECIPES,
                                        
                                        variables: { username }

                                    
                                    });

                                    cache.writeQuery({

                                        query: GET_USER_RECIPES,

                                        variables: { username },

                                        data: {

                                            getUserRecipes: getUserRecipes.filter(recipe => recipe._id !== deleteUserRecipe._id)
                                        }
                                    })

                                    // console.log(data)
                                }}
                                
                                >

                                    {(deleteUserRecipe, attrs = {}) => {

                                        return (

                                            <p 
                                            className="delete-button"
                                            
                                            onClick = {() => handleDelete(deleteUserRecipe)}

                                            >{attrs.loading ? "deleting...." : "X"}</p>

                                        )

                                    }}

                                </Mutation>

                            </li>

                        )


                        )}

                    </ul>
                </div>
            )

        }}



    </Query>

)

export default UserRecipes;