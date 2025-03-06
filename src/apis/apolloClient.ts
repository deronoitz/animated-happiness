import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
} from "@apollo/client";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

// Create the WebSocket client for GraphQL subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql", // Replace with your WebSocket URL
  })
);

// Create the HTTP link for regular queries and mutations
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql", // Replace with your HTTP URL
});


// Create the Apollo Link that decides whether to use the WebSocket or HTTP link
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

// Create the Apollo Client
export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
