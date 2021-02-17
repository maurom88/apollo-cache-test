import React from 'react';

import { gql, useQuery } from '@apollo/client';

// Query the currencyCodes local field (returning the value of currencyCodesVar reactive variable)
const CURRENCY_CODES_QUERY = gql`
  query GetCurrencyCodes {
    currencyCodes @client
  }
`;

// Component that returns a list of currency codes from the reactive variable currencyCodesVar by reading it from local field (not reading variable directly)
export default function CurrencyCodes() {
  const { data, loading, error } = useQuery(CURRENCY_CODES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <div>
      <p>
        List of currency codes obtained by querying a local field that returns
        the value of a reactive variable
      </p>
      <div>
        {data &&
          data.currencyCodes.map((currencyCode) => (
            <p key={currencyCode}>{currencyCode}</p>
          ))}
      </div>
    </div>
  );
}
