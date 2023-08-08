import gql from "graphql-tag";

export const GET_REPOSITORIES_BY_USERNAME = gql`
query GetUserRepositories($username: String!) {
  user(login: $username) {
     repositories(first: 100, orderBy: { field: UPDATED_AT, direction: DESC }) {
      edges {
        node {
          id
          name
          stargazerCount
          updatedAt
          url
          isPrivate
        }
      }
    }
  }
}
`;
export const GET_REPOSITORIES_BY_QUERY = gql`
query GetSearchedRepositories($query: String!) {
  search(query: $query, type: REPOSITORY, first: 20) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          id
          name
          stargazerCount
          updatedAt
          url
          isPrivate
        }
      }
    }
  } 
}
`;
export const GET_REPOSITORY_BY_ID = gql`
query GetUserRepositories($username: String!) {
  user(login: $username) {
     repositories(first: 100, orderBy: { field: UPDATED_AT, direction: DESC }) {
      edges {
        node {
          id
          name
          stargazerCount
          updatedAt
          url
          isPrivate
        }
      }
    }
  }
}
`;
