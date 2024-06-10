import React, { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apolloClient";

interface ApolloProviderProps {
  children: ReactNode;
}

export const ApolloProviderWrapper: React.FC<ApolloProviderProps> = ({
  children,
}) => <ApolloProvider client={client}>{children}</ApolloProvider>;
