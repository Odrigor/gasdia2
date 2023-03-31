import React, { useState } from 'react';
import axios from 'axios';

const Registros = () => {
  const [fecha, setFecha] = useState('');
  const [pedidos, setPedidos] = useState([]);

  const uri = import.meta.env.VITE_BACKEND_URL;


  const calculateDistance = (lat1, lon1, lat2, lon2) => {  
    const R = 6371e3; 
    const φ1 = lat1 * Math.PI/180; 
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;
  
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
    const d = Math.round(R * c);
    return d;
  }


  const handleFechaChange = (event) => {
    setFecha(event.target.value);
  };

  const handleBuscarClick = async () => {
    try {
      const response = await axios.get(uri+ `/api/pedidos/registros?fecha=${fecha}`);
      setPedidos(response.data);
    } catch (error) {
      // Aquí deberías manejar el error como quieras
      console.error(error);
    }
  };

  return (
    <div className="registros">
      <div className="form">
        <label htmlFor="fecha">Fecha:</label>
        <input type="date" id="fecha" value={fecha} onChange={handleFechaChange} />
        <button onClick={handleBuscarClick}>Buscar</button>
      </div>

      <div className="cards">
        {pedidos.map((pedido) => (
          <div key={pedido.id_pedido} className="card">
            {/* Aquí puedes mostrar la información del pedido como quieras */}
            <p>ID Pedido: {pedido.id_pedido}</p>
            <p>ID Cliente: {pedido.id_cliente}</p>
            <p>Repartidor: {pedido.repartidor}</p>
            <p>direccion : {pedido.direccion_entrega}</p>
            {/* ... */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Registros;