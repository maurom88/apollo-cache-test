import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { currencyCodesVar } from '../cache';

// Query a currencies from the cient to return one that matches the given currency code
const CURRENCY_QUERY = gql`
  query GetCurrency($currencyCode: String!) {
    currency(currencyCode: $currencyCode) @client
  }
`;

// Component that renders a dropdown menu and the name of the selected currency
export default function Currency() {
  // Hook to determine selected element from the dropdown menu
  const [selectedCurrency, setSelectedCurrency] = React.useState(
    currencyCodesVar()[0]
  );

  // Run query with selected currency code set as variable
  const { loading, error, data } = useQuery(CURRENCY_QUERY, {
    variables: { currencyCode: selectedCurrency }
  });

  // Change state of selectedElement (clicked element from dropdown menu)
  function handleChange(event) {
    setSelectedCurrency(event.target.value);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message} </p>;

  return (
    <div>
      {/* Dropdown menu */}
      <form>
        <label htmlFor='Currencies'>Choose a currency: </label>
        <select
          name='currencies'
          value={selectedCurrency}
          onChange={handleChange}
        >
          {/* For each element in the currencyCodesVar reactive variable array, create an option in the menu displaying the value of the currency code */}
          {currencyCodesVar().map((currencyCode) => (
            <option key={currencyCode} value={currencyCode}>
              {currencyCode}
            </option>
          ))}
        </select>
        <br />
        <br />
      </form>
      {/* Display selected currency returned by query */}
      <p>Selected currency: {data.currency[0].name}</p>
    </div>
  );
}
