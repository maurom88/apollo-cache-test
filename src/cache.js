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

// Create array of currency codes from currencies
const currencyCodes = currencies.map((currency) => {
  return currency.code;
});

// Create allCurrenciesVar reactive variable
export const allCurrenciesVar = makeVar(currencies);
// Create currencyCodesVar reactive variable (empty array)
export const currencyCodesVar = makeVar(currencyCodes);

// Define local type policies in cache
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // Return an array of all currencies
        allCurrencies: {
          read() {
            return allCurrenciesVar();
          }
        },
        // Return an array of currencies that match the given code
        currency: {
          read(_, { variables }) {
            return allCurrenciesVar().filter(
              (currency) => currency.code === variables.currencyCode
            );
          }
        },
        // Return a list of currency codes defined in a currencyCodesVar reactive variable
        currencyCodes: {
          read() {
            return currencyCodesVar();
          }
        }
      }
    }
  }
});
