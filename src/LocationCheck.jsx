import React from 'react';

const LocationCheck = () => {
  const [locationShared, setLocationShared] = React.useState(false);

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // El usuario ha compartido su ubicación
          setLocationShared(true);
        },
        (error) => {
          // El usuario no ha compartido su ubicación
          setLocationShared(false);
        }
      );
    } else {
      // La geolocalización no está disponible en este navegador
      setLocationShared(false);
    }
  };

  return (
    <div>
      {!locationShared && (
        <>
          <p>Debes compartir tu ubicación para continuar navegando en este sitio web.</p>
          <button onClick={handleLocationRequest}>Compartir ubicación</button>
          <p>Si al clickear el boton no se te desplega la opcion de compartir ubicacion, actualiza la pagina</p>
        </>
      )}
    </div>
  );
};

export default LocationCheck;