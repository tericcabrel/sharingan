import { gql } from 'apollo-server-core';

export default gql`
  type LoginResult {
    token: String!
  }

  type Query {
    authenticatedUser: User
  }

  type Mutation {
    loginUser(email: String!, password: String!): LoginResult!
    logoutUser: Boolean!
  }
`;