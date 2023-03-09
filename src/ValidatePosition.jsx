import React, { useState, useEffect } from 'react';

function ValidatePosition() {
  const [locationEnabled, setLocationEnabled] = useState(false);

  useEffect(()=>{

    const intervalId = setInterval(() => {

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("Geolocation is enabled.");
            setLocationEnabled(true);
          },
          (error) => {
            console.error("Geolocation is disabled.");
            setLocationEnabled(false);
          }
        );
      }

    }, 500);

    return () => {
      clearInterval(intervalId);
    }

  },[]);

  return (
    <div>
      {locationEnabled ? (
        <p>Geolocation is enabled.</p>
      ) : (
        <p>Geolocation is disabled.</p>
      )}
    </div>
  );
}

export default ValidatePosition;
