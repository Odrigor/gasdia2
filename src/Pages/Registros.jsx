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

        {pedidos.map((pedido) => {
          const entrega = entregas.find(
            (entrega) => entrega.id_pedido === pedido.id_pedido
          );
          let distancia;
          let alerta;
          
          const fechaPedido = new Date(pedido.fechahora);
          const horaPedidoFormateada = fechaPedido.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

          let horaEntregaFormateada;
          let diferencia;
          if (entrega) {
            const fechaEntrega = new Date(entrega.fechahora);
            horaEntregaFormateada = fechaEntrega.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
            diferencia = (fechaEntrega - fechaPedido) / 1000 / 60;
          }


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
              {entrega ? (
                
                <>
                  <p>ID Pedido: {pedido.id_pedido}</p>
                  <p>ID Cliente: {pedido.id_cliente}</p>
                  <p>Repartidor: {pedido.repartidor}</p>
                  <p>direccion : {pedido.direccion_entrega}</p>
                  <p>Distancia: {distancia} metros</p>
                  <p>Alerta: {alerta}</p>
                  <p>Hora de pedido: {horaPedidoFormateada}</p>
                  <p>Hora de entrega: {horaEntregaFormateada}</p>
                  <p>Minutos de entrega: {diferencia}</p>
                </>
              )
            :
            <>
              <p>ID Pedido: {pedido.id_pedido}</p>
                <p>ID Cliente: {pedido.id_cliente}</p>
                <p>Repartidor: {pedido.repartidor}</p>
                <p>Hora de pedido: {horaPedidoFormateada}</p>
                <p>direccion : {pedido.direccion_entrega}</p>
                <p>Alerta: NO ENTREGADO</p>
            </>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Registros;