const {gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book{
        authors: [String]
        description: String
        bookId: String!
        image: String
        link: String
        title: String!
    }
    
    type User {
        _id: ID
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }
    
    type Auth {
        token: ID!
        user: User
    }
    
    input SavedBookInput {
        authors: [String]
        title: String
        description: STring
        bookId: String
        link: String
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: savedBookInput): User
        removeBook(bookId: String!): User
    }
    `