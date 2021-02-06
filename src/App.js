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
        allCurrencies: {
          read() {
            return currencies
          }
        },
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
        },
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

const ALL_CURRENCIES = gql`
  query GetAllCurrencies {
    allCurrencies @client
  }
`;

const CURRENCIES = gql`
  query GetCurrency($currencyCode: String!) {
    currencies(currencyCode: $currencyCode) @client
    name @client
    symbol @client
  }
`;

function Currencies() {
  const currencyCode = 'CAD';

  const { loading, error, data } = useQuery(CURRENCIES, {
    variables: { currencyCode }
  });

  const { loading: loadingAll, error: errorAll, data: dataAll } = useQuery(
    ALL_CURRENCIES
  );

  if (loading || loadingAll) return <p>Loading...</p>;
  if (error || errorAll)
    return (
      <p>
        Error: {error.message} || {errorAll.message}
      </p>
    );

  console.log(data.currencies);
  console.log(dataAll.allCurrencies)
  return (
    <div>
      {data.name} {data.symbol}
    </div>
  );
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
