import React, { useState } from 'react';
import axios from 'axios';

const Registros = () => {
  const [fecha, setFecha] = useState('');
  const [pedidos, setPedidos] = useState([]);

  const uri = import.meta.env.VITE_BACKEND_URL;

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