import React, { Component } from 'react'
import Mutation from 'react-apollo/Mutation';
import { ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES } from '../../queries/index';
import { withRouter } from 'react-router-dom';

import CKEditor from 'react-ckeditor-component'



import Error from '../Error'
import WithAuth from '../WithAuth';
import Spinner from '../Spinner';





const initialState = {

  name: "",

  imageUrl: "",

  category: "Breakfast",

  description: "",

  instructions: "",

  username: ""
}

class AddRecipe extends Component {

  state = { ...initialState }

  clearState = () => {

    this.setState({ ...initialState })
  }

  componentDidMount() {

    // console.log(this.props.session.getCurrentUser.username);

    this.setState(() => ({

      username: this.props.session.getCurrentUser.username
    }))

  }

  handleSubmit = (e, addRecipe) => {

    e.preventDefault();

    addRecipe().then(({ data }) => {

      // console.log(data)

      this.clearState();

      this.props.history.push('/');

    })

  }

  handleEditorChange = event =>{

    const newContent = event.editor.getData();

    this.setState({ instructions: newContent })
  }

  handleChange = (e) => {

    const { name, value } = e.target;

    this.setState({ [name]: value })
  }


  validForm = () => {
    const { name, imageUrl,  category, description, instructions } = this.state

    const invalidate = !name || !imageUrl || !category || !description || !instructions;

    return invalidate;
  }

  // Optimistic UI

  updateCache = (cache,  {data: { addRecipe} }) => {

    const {getAllRecipes} = cache.readQuery({query: GET_ALL_RECIPES});

    cache.writeQuery({

      query: GET_ALL_RECIPES,

      data: {

        getAllRecipes: [addRecipe, ...getAllRecipes]

      }
    });
  };

  render() {
    const { name, imageUrl, category, description, instructions, username } = this.state
    return (
      <div className="App">

        <h2 className="App">Add Recipe</h2>

        <Mutation 
        
        mutation={ADD_RECIPE}
        
        variables={{ name, imageUrl, category, description, instructions, username }}

        refetchQueries={()=>[

          { query: GET_USER_RECIPES, variables: { username } },

        ]}
        
        update={this.updateCache}
        
        >

          {(addRecipe, { data, loading, error }) => {

            if (loading) return <Spinner />

            // console.log(data)


            return (

              <form className="form" onSubmit={(e => this.handleSubmit(e, addRecipe))}>

                <input type="text" name="name" placeholder="Recipe Name" onChange={this.handleChange} value={name} />

                <input type="text" name="imageUrl" placeholder="Recipe Image" onChange={this.handleChange} value={imageUrl} />
                

                <select name="category" onChange={this.handleChange} value={category}>

                  <option value="Breakfast">Breakfast</option>

                  <option value="Lunch">Lunch</option>

                  <option value="Dinner">Dinner</option>

                  <option value="Snacks">Snacks</option>

                </select>

                <input type="text" name="description" placeholder="Add Description" onChange={this.handleChange} value={description} />

                <label htmlFor= "instructions">Add Instructions</label>

                <CKEditor 
                
                name="instructions"
                
                content={instructions}

                events={{ change: this.handleEditorChange}}
                />
                {/* <textarea type="text" name="instructions" placeholder="Add Instructions" onChange={this.handleChange} value={instructions}></textarea> */}

                <button
                  type="submit"

                  disabled={loading || this.validForm()}
                  
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
export default WithAuth( session => session && session.getCurrentUser)(withRouter(AddRecipe));