import React, { useState } from 'react';
import axios from 'axios';

const SearchAddress2 = () => {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);

    if (value.length > 3) {
      axios
        .get('https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest', {
          params: {
            text: value,
            f: 'json',
            token: 'AAPK904d7ea339874c398db5877689b626d88zd9H8gtNj0O3HYtyjzxTNl9hmQYFZgTOXJHyw_gtXMvzDuIOGcM7G8LgYjIGTkn',
            countryCode: 'CL',
            searchExtent: '-70.9119,-33.6659,-70.4702,-33.3268'
          }
        })
        .then((response) => {
          setSuggestions(response.data.suggestions);
        });
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setAddress(suggestion.text);
    setSuggestions([]);

    axios
      .get('https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates', {
        params: {
          magicKey: suggestion.magicKey,
          f: 'json',
          token: 'AAPK904d7ea339874c398db5877689b626d88zd9H8gtNj0O3HYtyjzxTNl9hmQYFZgTOXJHyw_gtXMvzDuIOGcM7G8LgYjIGTkn'
        }
      })
      .then((response) => {
        if (response.data.candidates.length > 0) {
          const location = response.data.candidates[0].location;
          setLatitude(location.y);
          setLongitude(location.x);
        }
      });
  };

  return (
    <div>
      <input
        type="text"
        value={address}
        onChange={handleAddressChange}
        placeholder="Enter an address"
      />
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.magicKey} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion.text}
          </li>
        ))}
      </ul>
      {latitude && longitude && (
        <div>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
        </div>
      )}
    </div>
  );
};

export default SearchAddress2;