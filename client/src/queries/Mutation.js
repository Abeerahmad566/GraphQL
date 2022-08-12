import { gql } from "@apollo/client";
export const CREATE_BOOK = gql`
  mutation createBook($name: String, $genre: String, $author: String) {
    createBook(book: { name: $name, genre: $genre, author: $author }) {
      id
      name
      genre
      author
    }
  }
`;
export const CREATE_NOTI = gql`
  mutation createNoti($name: String) {
    createNoti(name: $name) {
      name
    }
  }
`;
export const UPDATE_BOOK = gql`
  mutation updateBook(
    $id: String!
    $name: String!
    $genre: String!
    $author: String!
  ) {
    updateBook(id: $id, name: $name, genre: $genre, author: $author) {
      id
      name
      genre
      author
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($id: String) {
    deleteBook(id: $id)
  }
`;
