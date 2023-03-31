import React, { useState, useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Navigate } from 'react-router-dom'

const Pedidos = () => {

  const uri = import.meta.env.VITE_BACKEND_URL;

  const {user, setUser} =  useContext(UserContext);
  console.log('xD')
    if(!user || user.rol=== 2){
      return <Navigate to="/" ></Navigate>
    }

  const [pedidos, setPedidos] = useState([]);
  const [nombreRepartidor, setNombreRepartidor] = useState("");
  const [productosEmpresa, setProductosEmpresa] = useState([]);

  useEffect(() => {
    axios.get(uri+'/api/productos')
      .then(res => setProductosEmpresa(res.data))
      .catch(err => console.error(err));
  }, []);

  async function fetchData(setPedidos) {
    try {
      const response = await axios.get(uri+'/api/pedidos');
      console.log(response.data);
      setPedidos(response.data);
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    fetchData(setPedidos);
    const interval = setInterval(() => fetchData(setPedidos), 30000);
    return () => clearInterval(interval);
  }, []);



  const handleCopyLink = async (e, id_pedido) => {
    e.preventDefault();
  
    const link = uri+`/entrega/${id_pedido}`;
    navigator.clipboard.writeText(link);
  
    let validaa;
    try {
      const repartidor = nombreRepartidor[id_pedido];
      validaa = await axios.post(uri+'/api/asociar', { id_pedido, repartidor });
    } catch (error) {
      console.error(error);
    }
    console.log(validaa);
    if(validaa){
      toast.success('se ha actualizado el nombre del repatidor en la base de datos');
    }
    else{
      toast.error('No ha sido posible actualizar el nombre del repartidor en la base de datos');
    }
  };
  return (
    <div className="pedidos-container">
      <h2>Pedidos</h2>
      {pedidos.map((pedido) => {
        const date = new Date(pedido.fechahora);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;


  return (
    <div key={pedido.id_pedido} className="pedido-item">
      <h3>{pedido.direccion_entrega}</h3>
      <p>{pedido.infoextra}</p>
      <p>Hora del pedido : {formattedTime}</p>
      <p>pedido :{productosEmpresa[pedido.id_producto - 1].nombre}</p>
      <form>
        <input
          type="text"
          placeholder="Nombre repartidor"
          value={nombreRepartidor[pedido.id_pedido] || ""}
          onChange={(e) =>
            setNombreRepartidor({
              ...nombreRepartidor,
              [pedido.id_pedido]: e.target.value,
            })
          }
        />
        <button
          className="btn-copy-link"
          onClick={(e) => handleCopyLink(e, pedido.id_pedido)}
        >
          Copiar Link
        </button>
      </form>
      <ToastContainer />
    </div>
    
  );
})}
    </div>
  );
};
export default Pedidos;