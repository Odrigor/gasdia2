import React, { useState, useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Navigate } from 'react-router-dom'

const AdminPanel = () => {

  const {user, setUser} =  useContext(UserContext);
  console.log('xD')
    if(!user || user.rol=== 1){
      return <Navigate to="/" ></Navigate>
    }

  const [pedidos, setPedidos] = useState([]);
  const [nombreRepartidor, setNombreRepartidor] = useState("");
  const [productosEmpresa, setProductosEmpresa] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/productos')
      .then(res => setProductosEmpresa(res.data))
      .catch(err => console.error(err));
  }, []);



  return (
    <p>{JSON.stringify(productosEmpresa)}</p>
  );
};
export default AdminPanel;