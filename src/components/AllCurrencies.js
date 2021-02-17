import React from 'react';

import { gql, useQuery } from '@apollo/client';

// Query the allCurrencies field on the client
const ALL_CURRENCIES_QUERY = gql`
  query GetAllCurrencies {
    allCurrencies @client
  }
`;

// Component that renders a list of all currencies
export default function AllCurrencies() {
  const { loading, error, data } = useQuery(ALL_CURRENCIES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message} </p>;

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
