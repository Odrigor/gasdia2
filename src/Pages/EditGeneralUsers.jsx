import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditGeneralUsers = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const uri = import.meta.env.VITE_BACKEND_URL;


  // Función para obtener la lista de usuarios desde el servidor
  const obtenerUsuarios = async () => {
    try {
      // Enviar la solicitud al endpoint /api/users
      const res = await axios.get(uri+'/api/users');
      // Actualizar el estado con los datos recibidos
      setUsuarios(res.data);
    } catch (err) {
      // Mostrar una notificación de error
      toast.error(err.response.data.error);
    }
  };

  // Obtener la lista de usuarios cuando el componente se monta
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // Función para deshabilitar un usuario
  const deshabilitarUsuario = async (user) => {
    try {
      // Enviar la solicitud al endpoint /api/updateUser
      const res = await axios.post(uri+'/api/updateUser', {
        oldusername:user,
        username,
        password,
        rol: 0
      });
      // Mostrar una notificación de éxito
      toast.success(res.data.message);
    } catch (err) {
      // Mostrar una notificación de error
      toast.error(err.response.data.error);
    }
  };

  // Función para modificar un usuario
  const modificarUsuario = async (user) => {
    try {
      // Enviar la solicitud al endpoint /api/updateUser
      const res = await axios.post(uri+'/api/updateUser', {
        oldusername:user,
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
       <h3>Gestión Usuarios General</h3>
      
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>
            ID: {usuario.id_usuario} - Username: {usuario.user}
            <button onClick={() => deshabilitarUsuario(usuario.user)}>Deshabilitar</button>
            <button onClick={() => setUsuarioSeleccionado(usuario)}>Modificar</button>
          </li>
        ))}
      </ul>

      {usuarioSeleccionado && (
        <>
          <h4>Modificar Usuario</h4>
          <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <button onClick={() => modificarUsuario(usuarioSeleccionado.user)}>Guardar Cambios</button>
        </>
      )}
    </>
  );
};

export default EditGeneralUsers;