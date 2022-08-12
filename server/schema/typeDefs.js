const { gql } = require("@apollo/client");
//Queries
const typeDefs = gql`
  type Book {
    id: String
    name: String
    genre: String
    author: String
  }
  type Notification {
    name: String
  }
  type Query {
    hello: String
    getAll: [Book]
    getAllnoti: [Notification]
  }
  input NotificationInput {
    name: String
  }
  input BookInput {
    name: String
    genre: String
    author: String
  }
  type Subscription {
    messageCreated: Notification
  }
  type Mutation {
    createBook(book: BookInput): Book
    updateBook(
      id: String!
      name: String!
      genre: String!
      author: String!
    ): Book!
    deleteBook(id: String): String
    createNoti(name: String): Notification
  }
`;

module.exports = typeDefs;
