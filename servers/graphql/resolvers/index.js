const
    postResolvers = require('./postResolver'),
    userResolvers = require('./userResolver')

module.exports = {
    Query: {
        ...postResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation
    }
}