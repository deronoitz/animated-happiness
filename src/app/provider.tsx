'use client';

import { apolloClient } from "@/apis/apolloClient";
import { ApolloProvider } from "@apollo/client";

export default function Provider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
