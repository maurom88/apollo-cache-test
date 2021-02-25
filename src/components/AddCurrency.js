import React from 'react';

function handleSubmit(e) {
  e.preventDefault()
}

export default function AddCurrency() {
  return (
    <div>
     <form onSubmit={handleSubmit}>
       <label htmlFor="currency-name">Currency name: </label>
       <input type="text" name="currency-name"></input>
       <br />
       <label htmlFor="currency-name">Currency code: </label>
       <input type="text" name="currency-code"></input>
       <br />
       <label htmlFor="currency-name">Currency symbol: </label>
       <input type="text" name="currency-symbol"></input>
       <br />
       <button type="submit">Submit</button>
     </form>
    </div>
  );
}
