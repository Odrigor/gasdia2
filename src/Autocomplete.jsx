import React, { useState } from 'react';

function Autocomplete() {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (event) => {
    setInputValue(event.target.value);

    if (event.target.value.length > 2) {
      const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${event.target.value}&apiKey=b64e123fff544c4782379497fd3926ad`);
      const data = await response.json();
      setSuggestions(data.features);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <ul>
        {suggestions.map(suggestion => (
          <li key={suggestion.properties.id}>{suggestion.properties.formatted}</li>
        ))}
      </ul>
    </>
  );
}

export default Autocomplete;