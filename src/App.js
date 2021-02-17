import './App.css';
import React from 'react';
import { ApolloProvider, ApolloClient } from '@apollo/client';

import { cache } from './cache';

import Currency from './components/Currency';
import AllCurrencies from './components/AllCurrencies';

// Create new instance of Apollo client
const client = new ApolloClient({
  // Import cache defined above
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
      </div>
    </ApolloProvider>
  );
}

export default App;
