import { useState, useEffect } from "react";

function LocationComponent() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationShared, setLocationShared] = useState(false);


  const handleClick= ()=>{

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLocationShared(true);
        },
        (error) => {
          setLocationShared(false);
        }
      );
    }

  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLocationShared(true);
        },
        (error) => {
          setLocationShared(false);
        }
      );
    }
  }, []);

  return (
    <div>
      {locationShared ? (
        <p>
          Tu ubicación es: Latitud: {latitude}, Longitud: {longitude}
        </p>
      ) : (
        <>
        <p>Por favor comparte tu ubicación para ver tus coordenadas, si al apetar el boton no sucede nada, actualiza la pagina</p>
        <button onClick={handleClick}> Activar ubicacion</button>

        </>
        
      )}
    </div>
  );
}

export default LocationComponent;