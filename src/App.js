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
        // Return an array of all currencies
        allCurrencies: {
          read() {
            return currencies;
          }
        },
        // Return an array of currencies that match the given code
        currencies: {
          read(_, { variables }) {
            return currencies.filter(
              (currency) => currency.code === variables.currencyCode
            );
          }
        },
        // Return the name of the first currency
        name: {
          read() {
            return currencies[0].name;
          }
        },
        // Return the symbol of the first currency
        symbol: {
          read() {
            return currencies[0].symbol;
          }
        }
      }
    }
  }
});

// Create new instance of Apollo client
const client = new ApolloClient({
  // Import cache defined above
  cache
});

// Query the allCurrencies field on the client
const ALL_CURRENCIES = gql`
  query GetAllCurrencies {
    allCurrencies @client
  }
`;

// Query the currencies, name and symbol field on the client
const CURRENCIES = gql`
  query GetCurrency($currencyCode: String!) {
    currencies(currencyCode: $currencyCode) @client
    name @client
    symbol @client
  }
`;

function AllCurrencies() {
  const { loading, error, data } = useQuery(ALL_CURRENCIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message} </p>;

  const allCurrencies = data.allCurrencies;
  return (
    <div>
      {allCurrencies.map((currency) => (
        <p key={currency.code}>
          {currency.name} {currency.code} {currency.symbol}{' '}
        </p>
      ))}
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo App</h2>
        <AllCurrencies />
      </div>
    </ApolloProvider>
  );
}

export default App;
