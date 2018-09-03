import { gql } from "apollo-boost";


import { recipeFragments } from "./fragments";


/* Recipe query */
export const GET_ALL_RECIPES = gql`

query {

    getAllRecipes {
      
        _id

        name

        imageUrl

        category

        description

        instructions

        createDate

        likes

    }

  }
`;

export const GET_RECIPE = gql`

query ($_id: ID!) {

  getRecipe(_id:$_id) {

    ...CompleteRecipe

 } 

}

${recipeFragments.recipe}

`;

export const SEARCH_RECIPES = gql`

  query ($searchTerm: String){

    searchRecipes(searchTerm: $searchTerm){

      _id

      name
      
      likes
  
    }

  }


`;

/* Recipe Mutation */

export const ADD_RECIPE = gql`

mutation ($name: String!, $imageUrl: String!, $category: String!, $description: String!, $instructions: String!, $username: String!){

  addRecipe(name:$name, imageUrl:$imageUrl, category:$category, description:$description, instructions:$instructions, username:$username) {

    ...CompleteRecipe
  }

}

${recipeFragments.recipe}

`;

export const DELETE_USER_RECIPE = gql`

mutation($_id: ID!) {

  deleteUserRecipe(_id: $_id) {

    _id
  }

}


`;


export const LIKE_USER_RECIPE = gql`

    mutation($_id: ID!, $username: String!) {

      likeUserRecipe(_id: $_id, username: $username) {

        ...LikeRecipe
      }
    }
    
    ${recipeFragments.like}
 
`


export const UNLIKE_USER_RECIPE = gql`

    mutation($_id: ID!, $username: String!) {

      unlikeUserRecipe(_id: $_id, username: $username) {

        ...LikeRecipe

      }

    }
    
    ${recipeFragments.like}

`




/*User Queries */

export const GET_CURRENT_USER = gql`

query { 
  getCurrentUser{
    
    username
  
    email
  
    joinDate

    favorites {
      _id

      name

    }

  }
}
`
  ;

export const GET_USER_RECIPES = gql`

  query($username: String!) {

    getUserRecipes(username: $username) {

      _id

      name

      likes

    }
  }


`

/* User Mutations */
export const SIGNUP_USER = gql`

mutation($username: String!, $email: String!, $password: String!) {

    signupUser(username: $username, email: $email, password: $password){

      token
    }
  }

`
  ;
export const SIGNIN_USER = gql`

mutation($username: String!, $password: String!){

    signinUser(username: $username, password: $password){

    token
  }}

`
  ;

