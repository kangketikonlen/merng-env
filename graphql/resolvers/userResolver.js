const
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    { UserInputError } = require('apollo-server')

const
    { validateRegisterInput, validateLoginInput } = require('../../utils/validator'),
    { SECRET_KEY } = require('../../config'),
    User = require('../../models/userModel')

function generateToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, SECRET_KEY, { expiresIn: '1h' })
}

module.exports = {
    Mutation: {
        async login(_, { username, password }) {
            // Validate user data.
            const { valid, errors } = validateLoginInput(username, password)
            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }
            // Make sure user exists.
            const user = await User.findOne({ username })
            if (!user) {
                throw new UserInputError('Data tidak valid!', {
                    errors: {
                        general: 'Username tidak di temukan!'
                    }
                })
            }
            // Match password and create auth token.
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                throw new UserInputError('Data tidak valid!', {
                    errors: {
                        general: 'Password tidak cocok!'
                    }
                })
            }
            const token = generateToken(user)
            return {
                ...user._doc,
                id: user.id,
                token
            }
        },
        async register(_, { registerInput: { username, email, password, confirmPassword } }, context, info) {
            // Validate user data.
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }
            // Make sure user does'nt exists.
            const user = await User.findOne({ username })
            if (user) {
                throw new UserInputError('Username sudah terpakai!', {
                    errors: {
                        username: 'Username ini sudah digunakan!'
                    }
                })
            }
            // Hash password and create auth token.
            password = await bcrypt.hash(password, 12)
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })
            const res = await newUser.save()
            const token = generateToken(res)
            return {
                ...res._doc,
                id: res.id,
                token
            }
        }
    }
}