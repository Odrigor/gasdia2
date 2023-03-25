import React, { useState, useEffect } from "react";
import axios from "axios";
const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [nombreRepartidor, setNombreRepartidor] = useState("");
  const [productosEmpresa, setProductosEmpresa] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/productos')
      .then(res => setProductosEmpresa(res.data))
      .catch(err => console.error(err));
  }, []);

  async function fetchData(setPedidos) {
    try {
      const response = await axios.get('http://localhost:3000/api/pedidos');
      console.log(response.data);
      setPedidos(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    
  }, [])

  useEffect(() => {
    fetchData(setPedidos);
    const interval = setInterval(() => fetchData(setPedidos), 30000);
    return () => clearInterval(interval);
  }, []);
  const handleCopyLink = async (e, id_pedido) => {
    e.preventDefault();
  
    const link = `http://localhost:3000/entrega/${id_pedido}`;
    navigator.clipboard.writeText(link);
  
    try {
      const repartidor = nombreRepartidor[id_pedido];
      await axios.post('http://localhost:3000', { id_pedido, repartidor });
    } catch (error) {
      console.error(error);
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
      <p>pedido :{productosEmpresa[pedido.id_producto - 1].nombre} </p>
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
    </div>
  );
})}
    </div>
  );
};
export default Pedidos;