import React, { Component } from 'react';
import WithSession from "../WithSession";
import Mutation from 'react-apollo/Mutation';
import { LIKE_USER_RECIPE, GET_RECIPE, UNLIKE_USER_RECIPE } from '../../queries/index';


class LikeRecipe extends Component {


    state = {
        liked: false,

        username: ''

    }

    componentDidMount() {

        if (this.props.session.getCurrentUser) {

            const { username, favorites } = this.props.session.getCurrentUser;

            const { _id } = this.props;

            const prevLiked =

                favorites.findIndex(favorite => favorite._id === _id) > -1;

            this.setState({

                liked: prevLiked,

                username

            })

        }
    }

    handleClick = (likeUserRecipe, unlikeUserRecipe )=> {

        this.setState(prevState => ({

            liked: !prevState.liked
        }),

            () => this.handleLike(likeUserRecipe, unlikeUserRecipe)
        );
    }

    handleLike = (likeUserRecipe, unlikeUserRecipe) => {

        if (this.state.liked) {

            likeUserRecipe().then(async ({ data }) => {

                // console.log(data);

                await this.props.refetch();

            })

        } else {

            unlikeUserRecipe().then(async ({ data }) => {

                // console.log(data);

                await this.props.refetch();

            })
        }

    }

    updateLike = (cache, { data: { likeUserRecipe } }) => {

        const { _id } = this.props;

        const { getRecipe } = cache.readQuery({

            query: GET_RECIPE,

            variables: { _id }
        });

        cache.writeQuery({

            query: GET_RECIPE,

            variables: { _id },

            data: {

                getRecipe: { ...getRecipe, likes: likeUserRecipe.likes + 1 }
            }


        })


    }


    updateUnLike = (cache, { data: { unlikeUserRecipe } }) => {

        const { _id } = this.props;

        const { getRecipe } = cache.readQuery({

            query: GET_RECIPE,

            variables: { _id }
        });

        cache.writeQuery({

            query: GET_RECIPE,

            variables: { _id },

            data: {

                getRecipe: { ...getRecipe, likes: unlikeUserRecipe.likes -1 }
            }


        })


    }


    render() {
        const { liked, username } = this.state;

        const { _id } = this.props;

        return (
            <Mutation

                mutation={UNLIKE_USER_RECIPE}

                variables={{ username, _id }}

                update={this.updateUnLike}


            >

            {unlikeUserRecipe=> (

                <Mutation

                    mutation={LIKE_USER_RECIPE}

                    variables={{ _id, username }}

                    update={this.updateLike}

                >

                    {likeUserRecipe => {


                        return (
                            <div>
                                {/* { username ? <button>Likes</button> : ''} */}

                                {username && 
                                
                                <button className="like-button" onClick={() => this.handleClick(likeUserRecipe, unlikeUserRecipe)

                                }>{liked ? "Unliked" : "like"}</button>

                                }

                            </div>


                        )
                    }}


                </Mutation>

            )}




            </Mutation>)
    }
}

export default WithSession(LikeRecipe);