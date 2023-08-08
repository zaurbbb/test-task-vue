import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client/core';

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  cache,
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});
