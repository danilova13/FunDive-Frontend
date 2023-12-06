import React from "react";
import { 
    ApolloProvider as Provider, 
    ApolloClient, 
    InMemoryCache, 
    createHttpLink
} from "@apollo/client";

import App from "./App";

const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql'
})
    
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

// React.FC - React Functional Component 
// is a type provided by react lib in typescript to type-check functional components
// expects a props object and returns a React element 
const ApolloProvider: React.FC = () => (
    <Provider client={client}>
        <App/>
    </Provider>
)

export default ApolloProvider;

