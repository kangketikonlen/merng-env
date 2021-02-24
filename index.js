const
    mongoose = require('mongoose'),
    gql = require('graphql-tag'),
    { ApolloServer } = require('apollo-server')

const
    typeDefs = require('./graphql/typeDefs'),
    resolvers = require('./graphql/resolvers'),
    { MONGODB } = require('./config')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
})

mongoose
    .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected')
        return server.listen({ port: 5000 })
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    })
    .catch(err => {
        console.error(err)
    })