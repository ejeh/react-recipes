import React from 'react';

import { Link } from "react-router-dom";

import pose from "react-pose";

const RecipeItem = pose.li({

    show: {
        opacity: 1
    },

    hidden: {
        opacity: 0
    }

})

export default ({ _id, imageUrl, name, category}) => {

    return (
        <div>

            <RecipeItem style= {{ background: `url(${ imageUrl }) center center /
            
            cover no-repeat 

            `}} className="card">

            <span className={category}>{category}</span> 

            <div className = "card-text">

               <Link to={`/recipes/${_id}`}><h4>{name}</h4></Link>

                {/* <p><strong>{category}</strong></p> */}

            </div>


            </RecipeItem>
            
        </div>
    )
}

