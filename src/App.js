import './App.css';
import React from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  useQuery,
  gql
} from '@apollo/client';

const currencies = [
  {
    name: 'American Dollar',
    code: 'USD',
    symbol: '$'
  },
  {
    name: 'Canadian Dollar',
    code: 'CAD',
    symbol: '$'
  },
  {
    name: 'Euro',
    code: 'EUR',
    symbol: '$'
  },
];

const typeDefs = gql`
  extend type Query {
    name: String
  }
`;

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        currencies: {
          read() {
            return currencies
          }
        },
        name: {
          read() {
            return currencies[0].name;
          }
        }
      }
    }
  }
});

const client = new ApolloClient({
  // uri: 'https://48p1r2roz4.sse.codesandbox.io/',
  cache,
  typeDefs
});

const EXCHANGE_RATES = gql`
  query GetRates($code: String!) {
    # rates(currency: "USD") {
    #   currency
    # }
    currencies @client
    name @client
  }
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data.currencies)
  return <div>{data.name}</div>;
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo App</h2>
        <ExchangeRates />
      </div>
    </ApolloProvider>
  );
}

export default App;
