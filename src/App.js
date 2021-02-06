import './App.css';
import React from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  useQuery,
  gql,
  makeVar
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

const currencyCodes = makeVar([]);

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
        currency: {
          read(_, { variables }) {
            return currencies.filter(
              (currency) => currency.code === variables.currencyCode
            );
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

// Query a currencies from the cient to return one that matches the give currency code
const CURRENCY = gql`
  query GetCurrency($currencyCode: String!) {
    currency(currencyCode: $currencyCode) @client
  }
`;

function Currency() {
  const [ selectedCurrency, setSelectedCurrency ] = React.useState(currencyCodes()[0])

  const { loading, error, data } = useQuery(CURRENCY, {
    variables: { currencyCode: selectedCurrency }
  });

  function handleChange(event) {
    setSelectedCurrency(event.target.value)
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message} </p>;

  return (
    <div>
      {/* Dropdown menu */}
      <form>
        <label htmlFor='Currencies'>Choose a currency: </label>
        <select name='currencies' value={selectedCurrency} onChange={handleChange}>
          {currencyCodes().map((currencyCode) => (
            <option key={currencyCode} value={currencyCode}>
              {currencyCode}
            </option>
          ))}
        </select>
        <br />
        <br />
      </form>
      <p>Selected currency: {data.currency[0].name}</p>
    </div>
  );
}

function AllCurrencies() {
  const { loading, error, data } = useQuery(ALL_CURRENCIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message} </p>;

  // Add all currency codes to reactive variable currencyCodes
  currencyCodes(
    data.allCurrencies.map((currency) => {
      return currency.code;
    })
  );

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
        <hr />
        <Currency />
      </div>
    </ApolloProvider>
  );
}

export default App;
