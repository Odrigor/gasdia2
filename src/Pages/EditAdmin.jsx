import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const EditAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {user, setUser} =  useContext(UserContext);

  const uri = import.meta.env.VITE_BACKEND_URL;
  // Función para actualizar las credenciales del administrador
  const actualizarCredencialesAdmin = async () => {
    try {
      // Enviar la solicitud al endpoint /api/updateUser
      const res = await axios.post(uri+'/api/updateUser', {
        oldusername:user.user,
        username,
        password,
        rol: 2
      });
      // Mostrar una notificación de éxito
      toast.success(res.data.message);
    } catch (err) {
      // Mostrar una notificación de error
      toast.error(err.response.data.error);
    }
  };

  return (
    <>
      <h3>Editar Credenciales Administrador</h3>
      <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={actualizarCredencialesAdmin}>Modificar</button>
    </>
  );
};

export default EditAdmin;