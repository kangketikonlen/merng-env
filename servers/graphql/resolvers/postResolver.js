const { AuthenticationError } = require('apollo-server')
const
    Post = require('../../models/postModel'),
    checkAuth = require('../../utils/checkAuth')

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 })
                return posts
            } catch (errors) {
                throw new Error(errors)
            }
        },
        async getPost(_, { postId }) {
            try {
                const posts = await Post.findById(postId)
                if (posts) {
                    return posts
                } else {
                    throw new Error('Data tidak ada!')
                }
            } catch (errors) {
                throw new Error(errors)
            }
        }
    },
    Mutation: {
        async createPost(_, { body }, context) {
            const user = checkAuth(context)
            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            })
            const post = await newPost.save()
            return post
        },
        async deletePost(_, { postId }, context) {
            const user = checkAuth(context)
            try {
                post = await Post.findById(postId)
                if (user.username === post.username) {
                    await post.delete()
                    return 'Post berhasil di hapus!'
                } else {
                    throw new AuthenticationError('Anda tidak bisa menghapus post yang bukan punyamu!')
                }
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}