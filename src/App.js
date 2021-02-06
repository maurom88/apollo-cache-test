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

// Define list of currencies
const currencies = [
  {
    name: 'American Dollar',
    code: 'USD',
    symbol: '$',
    visible: true
  },
  {
    name: 'Canadian Dollar',
    code: 'CAD',
    symbol: '$',
    visible: true
  },
  {
    name: 'Euro',
    code: 'EUR',
    symbol: '€',
    visible: false
  },
  {
    name: 'Mexican Peso',
    code: 'MXN',
    symbol: '$',
    visible: true
  }
];

// Create currencyCodes reactive variable (empty array)
const currencyCodes = makeVar([]);

// Define local type policies in cache
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

// Query a currencies from the cient to return one that matches the given currency code
const CURRENCY = gql`
  query GetCurrency($currencyCode: String!) {
    currency(currencyCode: $currencyCode) @client
  }
`;

// Component that renders a dropdown menu and the name of the selected currency
function Currency() {
  // Hook to determine selected element from the dropdown menu
  const [selectedCurrency, setSelectedCurrency] = React.useState(
    currencyCodes()[0]
  );

  // Run query with selected currency code set as variable
  const { loading, error, data } = useQuery(CURRENCY, {
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
          {/* For each element in the currencyCodes reactive variable array, create an option in the menu displaying the value of the currency code */}
          {currencyCodes().map((currencyCode) => (
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

// Component that renders a list of all currencies
function AllCurrencies() {
  const { loading, error, data } = useQuery(ALL_CURRENCIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message} </p>;

  // Add all currency codes into reactive variable currencyCodes
  currencyCodes(
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
