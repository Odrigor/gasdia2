import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const NewUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const uri = import.meta.env.VITE_BACKEND_URL;
  // Función para añadir un nuevo usuario
  const añadirUsuario = async () => {
    try {
      // Enviar la solicitud al endpoint /api/register
      const res = await axios.post(uri+'/api/register', {
        username,
        password,
        rol: 1
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
      <h3>Añadir Usuario</h3>
      
      <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={añadirUsuario}>Añadir</button>
    </>
  );
};

export default NewUser;