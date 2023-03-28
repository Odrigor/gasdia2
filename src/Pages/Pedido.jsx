import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Pedido() {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [entregado, setEntregado] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUbicacion({
            latitud: position.coords.latitude,
            longitud: position.coords.longitude
          });
        },
        error => {
          console.error(error);
        }
      );
    } else {
      alert('La geolocalización no está disponible en este navegador');
    }
  }, []);

  useEffect(() => {
    if (ubicacion) {
      axios
        .post('http://localhost:3000/api/infoentrega',  { id_pedido: id })
        .then(res => {
          if (res.data === false) {
            setEntregado(true);
          } else {
            setPedido(res.data);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [id, ubicacion]);

  const handleEntrega = () => {
    if (confirm('¿Estás seguro?')) {
      
    } else {
      return
    }
    if (!ubicacion) return;
    axios
      .post('http://localhost:3000/api/entrega', {
        id_pedido: id,
        latitud_entrega: ubicacion.latitud,
        longitud_entrega: ubicacion.longitud
      })
      .then(() => {
        setEntregado(true);
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (!ubicacion) return <p>Comparte tu ubicación para ver la información del pedido</p>;
  if (entregado) return <p>Este pedido ya ha sido marcado como entregado</p>;
  if (!pedido) return <p>Cargando...</p>;

  return (
    <div className="pedido">
      <h2>Información del pedido</h2>
      <p>Dirección de entrega: {pedido.direccion_entrega}</p>
      <p>Información extra: {pedido.infoextra}</p>
      <p>Nombre del cliente: {pedido.nombre}</p>
      <p>Teléfono del cliente: {pedido.telefono}</p>
      <p>Producto: {pedido.producto}</p>
      <button onClick={handleEntrega}>Marcar como entregado</button>
    </div>
  );
}

export default Pedido;