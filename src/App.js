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
    symbol: '€'
  }
];

// Define local type policies
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        currencies: {
          read(_, { variables }) {
            return currencies.filter(
              (currency) => currency.code === variables.currencyCode
            );
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

// Create new instance of Apollo client
const client = new ApolloClient({
  // Import cache defined above
  cache,
});

const CURRENCIES = gql`
  query GetCurrency($currencyCode: String!) {
    currencies(currencyCode: $currencyCode) @client
    name @client
  }
`;

function Currencies() {
  const currencyCode = 'CAD';

  const { loading, error, data } = useQuery(CURRENCIES, {
    variables: { currencyCode }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data.currencies);
  return <div>{data.name}</div>;
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo App</h2>
        <Currencies />
      </div>
    </ApolloProvider>
  );
}

export default App;
