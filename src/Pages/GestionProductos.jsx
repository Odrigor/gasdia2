import React, { useState, useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Navigate } from 'react-router-dom'

const GestionProductos = () => {
  const {user, setUser} =  useContext(UserContext);
  if(!user || user.rol=== 1){
    return <Navigate to="/" ></Navigate>
  }

  const [productosEmpresa, setProductosEmpresa] = useState([]);
  const [productosModificados, setProductosModificados] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/productos')
      .then(res => {
        setProductosEmpresa(res.data);
        setProductosModificados(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const productosModificadosCopy = [...productosModificados];
    productosModificadosCopy[index][name] = value;
    setProductosModificados(productosModificadosCopy);
  }

  const handleSaveChanges = () => {
    axios.put('http://localhost:3000/api/productos', productosModificados)
      .then(res => {
        toast.success('Cambios guardados con éxito');
        setProductosEmpresa(productosModificados);
      })
      .catch(err => {
        toast.error('Error al guardar cambios');
        console.error(err);
      });
  }

  return (
    <>
      <table className="table-cont">
        <thead>
          <tr>
            <th>ID</th>
            <th>Precio Original</th>
            <th>Nombre</th>
            <th>Precio Promocional</th>
            <th>Días Margen</th>
          </tr>
        </thead>
        <tbody>
          {productosModificados.map((producto, index) => (
            <tr key={producto.id_producto}>
              <td>{producto.id_producto}</td>
              <td><input type="number" name="precio_original" value={producto.precio_original} onChange={(event) => handleInputChange(event, index)} /></td>
              <td><input type="text" name="nombre" value={producto.nombre} onChange={(event) => handleInputChange(event, index)} /></td>
              <td><input type="number" name="precio_promocional" value={producto.precio_promocional} onChange={(event) => handleInputChange(event, index)} /></td>
              <td><input type="number" name="dias_margen" value={producto.dias_margen} onChange={(event) => handleInputChange(event, index)} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleSaveChanges}>Guardar cambios</button>

      <ToastContainer />
    </>
  );
};

export default GestionProductos;