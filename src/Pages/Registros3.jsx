import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Registros = () => {
  const [fecha, setFecha] = useState('');
  const [pedidos, setPedidos] = useState([]);
  const [entregas, setEntregas] = useState([]);

  const uri = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchEntregas = async () => {
      try {
        const response = await axios.get(uri + '/api/entregas');
        setEntregas(response.data);
      } catch (error) {
        // Aquí deberías manejar el error como quieras
        console.error(error);
      }
    };

    fetchEntregas();
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // ...
  };

  // ...

  return (
    <div className="registros">
      {/* ... */}
      <div className="cards">
        {pedidos.map((pedido) => {
          const entrega = entregas.find(
            (entrega) => entrega.id_pedido === pedido.id_pedido
          );
          let distancia;
          let alerta;
          if (entrega) {
            distancia = calculateDistance(
              pedido.latitud_pedido,
              pedido.longitud_pedido,
              entrega.latitud_entrega,
              entrega.longitud_entrega
            );
            if (distancia < 100) {
              alerta = 'verde';
            } else if (distancia >= 100 && distancia < 1000) {
              alerta = 'amarilla';
            } else {
              alerta = 'roja';
            }
          }

          return (
            <div key={pedido.id_pedido} className="card">
              {/* ... */}
              {entrega && (
                <>
                    <p>ID Pedido: {pedido.id_pedido}</p>
                  <p>ID Cliente: {pedido.id_cliente}</p>
                  <p>Repartidor: {pedido.repartidor}</p>
                  <p>direccion : {pedido.direccion_entrega}</p>
                  <p>Distancia: {distancia} metros</p>
                  <p>Alerta: {alerta}</p>
                  <p>Hora de pedido: {pedido.fechahora}</p>
                  <p>Hora de entrega: {entrega.fechahora}</p>
                  {/* ... */}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Registros;