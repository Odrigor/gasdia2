import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Navigate } from 'react-router-dom'

import GestionProductos from './GestionProductos';
import VisualizarPedidos from './VisualizarPedidos';
import Registros from './Registros';
import GestionUsuarios from "./GestionUsuarios";

const AdminPanel = () => {
  const {user, setUser} =  useContext(UserContext);
  if(!user || user.rol=== 1){
    return <Navigate to="/" ></Navigate>
  }

  const [vistaActual, setVistaActual] = useState('gestionarProductos');

  return (
    <>
    <nav className="navbar">
      <ul>
        <li><button onClick={() => setVistaActual('gestionarProductos')}>Gestionar Productos</button></li>
        <li><button onClick={() => setVistaActual('visualizarVentas')}>Visualizar Ventas</button></li>
        <li><button onClick={() => setVistaActual('registros')}>Registros</button></li>
        <li><button onClick={() => setVistaActual('gestionarUsuarios')}>Gestión de Usuarios</button></li>
      </ul>
    </nav>

    {vistaActual === 'gestionarProductos' && <GestionProductos />}
    {vistaActual === 'visualizarVentas' && <VisualizarPedidos />}
    {vistaActual === 'registros' && <Registros />}
    {vistaActual === 'gestionarUsuarios' && <GestionUsuarios />}
  </>
  );
};

export default AdminPanel;