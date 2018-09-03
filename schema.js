exports.typeDefs = `

type Recipe {
    _id: ID
    name: String!
    imageUrl: String!
    category: String!
    description: String!
    instructions: String!
    createDate: String
    likes: Int 
    username: String
}

type User   {
    _id: ID
    username: String! @unique
    password: String!
    email: String!
    joinDate: String
    favorites: [Recipe]
}

type Query {
    getAllRecipes: [Recipe]
    
    getRecipe(_id: ID!): Recipe

    getCurrentUser: User

    searchRecipes( searchTerm: String): [Recipe]

    getUserRecipes(username: String!): [Recipe]
}

type Token {
    token: String!
}


type Mutation {
    addRecipe(
        name: String!,
        imageUrl: String!
        category: String!,
        description: String!,
        instructions: String!,
        username: String
    ): Recipe  


    signupUser(
        username: String!,
        password: String!
        email:String!
    ): Token

    likeUserRecipe(

        _id: ID

        username: String
        
    ): Recipe

    unlikeUserRecipe(

        _id: ID

        username: String
        
    ): Recipe

    deleteUserRecipe(
        
        _id: ID

    ): Recipe

    signinUser (
        username: String!
        password: String!
    ):Token

    
}


`;
