import './App.css';
import React from 'react';
import { ApolloProvider, ApolloClient, useQuery, gql } from '@apollo/client';

import { cache, currencyCodesVar } from './cache';

import Currency from './components/Currency';

// Create new instance of Apollo client
const client = new ApolloClient({
  // Import cache defined above
  cache
});

// Query the allCurrencies field on the client
const ALL_CURRENCIES_QUERY = gql`
  query GetAllCurrencies {
    allCurrencies @client
  }
`;

// Component that renders a list of all currencies
function AllCurrencies() {
  const { loading, error, data } = useQuery(ALL_CURRENCIES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message} </p>;

  // Add all currency codes into reactive variable currencyCodesVar
  currencyCodesVar(
    data.allCurrencies.map((currency) => {
      return currency.code;
    })
  );

  const allCurrencies = data.allCurrencies;

  return (
    <div>
      {allCurrencies.map((currency) =>
        currency.visible ? (
          <p key={currency.code}>
            {currency.name} {currency.code} {currency.symbol}{' '}
          </p>
        ) : null
      )}
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo App</h2>
        <AllCurrencies />
        <hr />
        <Currency />
      </div>
    </ApolloProvider>
  );
}

export default App;
