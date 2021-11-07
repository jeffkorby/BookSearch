const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth')
const { User, Book } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args, context ) => {
            if (context.user) {
                const userData =await User.findOne({ _id: context.user_id})
                return userData;
            }
            throw new AuthenticationError('You must be logged in');
        },
    },
    Mutation: {
       
        login: async ( parent, { email, password })=> {
            const user = await User.findOne({ email });
            if(!user) {
                throw new AuthenticationError('please check your credentials');
            }
            const correctPassWord = await user.isCorrectPassword(password)
            if(!correctPassWord) {
                throw new AuthenticationError('Please check your credentials');
            }
            const token = signToken(user);
            return {token, user};
        },
        addUser : async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password})
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, {book}, context) => {
            if (context.user) {
                const updateUser = await User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $addToSet: { savedBooks: book }},
                    { new: true}
                )
                return updateUser;
            }
            throw new AuthenticationError('You need to be logged in to save a book!');
        },
        removeBook: async (parent, {bookId}, context) => {
            if(context.user) {
                const updateUser = findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: {savedBooks: { bookId: bookId }}},
                    { new: true }
                )
                return updateUser;
            }
        }
        
    }
};
module.exports = resolvers;