'use strict';

// model dependencies
const
    mongoose                = require("mongoose"),
    Schema                  = mongoose.Schema



// MONGOOSE MODEL CONFIGURATION
const RecipeSchema = new Schema({

    
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required:true
    },
    category: {
        type: String,
        required:true
    },
    description: {
        type:String,
        required: true
    },
    instructions: {
        type:String,
        required: true 
    },
   createDate : {
        type: Date,
        default: Date.now()
    },
    likes: {
        type:Number,
        default: 0
    },
    username: {
        type:String
    }
    
});

RecipeSchema.index({

    "$**": "text"

})
module.exports = mongoose.model('Recipe', RecipeSchema);

