const
    jwt = require('jsonwebtoken'),
    { AuthenticationError } = require('apollo-server'),
    { SECRET_KEY } = require('../config')

module.exports = (context) => {
    const authHeader = context.req.headers.authorization
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1]
        if (token) {
            try {
                const user = jwt.verify(token, SECRET_KEY)
                return user
            } catch (error) {
                throw new AuthenticationError('Token salah atau sudah kadaluarsa!')
            }
        }
        throw new Error('Format token harus \'Bearer [token]')
    }
    throw new Error('Cantumkan authorization header!')
}