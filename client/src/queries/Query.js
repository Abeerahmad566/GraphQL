import { gql } from "@apollo/client";

export const getALL = gql`
  {
    getAll {
      id
      name
      genre
      author
    }
  }
`;

export const getALLNoti = gql`
  {
    getAllnoti {
      name
    }
  }
`;
