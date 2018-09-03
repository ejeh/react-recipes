const express   = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const cors       = require('cors');
const jwt        = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env'});
const Recipe    = require('./models/recipe');
const User      = require('./models/user');



// Bring in QraphQl-Express middleware  
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');

const { makeExecutableSchema }  = require('graphql-tools');


const { typeDefs }        = require('./schema');

const { resolvers }        = require('./resolvers');

// Create Schema
const schema = makeExecutableSchema({

    typeDefs,
    
    resolvers
});

// connect to db
mongoose
.connect(process.env.MONGO_URI)

.then(() => console.log('DB connected'))

.catch(err => console.log(err));

// initialize application
const app = express();

const corsOptions ={
    origin: 'http://localhost:3000',

    credentials: true
};

app.use(cors(corsOptions));


// set jwt authentication middleware
app.use(async (req, res, next) => {
    const token =  req.headers['authorization']
    
    if(token !== "null"){

        try {
            const currentUser = await jwt.verify(token, process.env.SECRET);
            
            req.currentUser = currentUser;
        } 
        catch(err) {

           console.error(err);
           
        }
    }
    console.log(token);

    next();
});


// Connect schemas with graphql
app.use('/graphql', bodyParser.json(), graphqlExpress(({ currentUser }) =>({
        
    schema,

    context: {
        Recipe,

        User, 

        currentUser
    }
})));

// Create GraphiQl application
app.use('/graphiql', graphiqlExpress({

     endpointURL: '/graphql'

    }));



const PORT = process.env.PORT || 4445

app.listen(PORT,  () => {
    console.log(`Server listenning on PORT ${PORT}`)
})