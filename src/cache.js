import { InMemoryCache, makeVar } from '@apollo/client';

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
export const currencyCodesVar = makeVar([]);

// Define local type policies in cache
export const cache = new InMemoryCache({
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
