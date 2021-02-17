import './App.css';
import React from 'react';
import { ApolloProvider, ApolloClient } from '@apollo/client';

// Import cache
import { cache } from './cache';

// Import components
import Currency from './components/Currency';
import AllCurrencies from './components/AllCurrencies';
import CurrencyCodes from './components/Currencycodes';
import AddCurrency from './components/AddCurrency'

// Create new instance of Apollo client 
const client = new ApolloClient({
  // Pass cache to Apollo Client
  cache
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo App</h2>
        <AllCurrencies />
        <hr />
        <Currency />
        <hr />
        <CurrencyCodes />
        <hr />
        <AddCurrency />
      </div>
    </ApolloProvider>
  );
}

export default App;
